use anyhow::{Context, Result};
use chrono::{DateTime, Local};
use clap::{ArgGroup, Parser, ValueEnum};
use std::ffi::OsStr;
use std::fs;
use std::path::{Path, PathBuf};
use std::env;
use walkdir::WalkDir;
use dialoguer::{theme::ColorfulTheme, Input, Select, Confirm};

/// /Simple, safe, pragmatic file organizer
#[derive(Parser, Debug)]
#[command(
    author, 
    version, 
    about = "Organize files in a directory into folders by extension or modification date (year/month).", 
    long_about = None
)]
#[command(group(ArgGroup::new("mode_config").required(false)))]
struct Cli {
    /// Target path to organize
    #[arg(short, long, value_name = "PATH", default_value = ".")]
    path: PathBuf,

    /// Organization mode: by extension or by mtime (year/month)
    #[arg(short, long, value_enum, default_value_t = Mode::Extension)]
    mode: Mode,

    /// Don't actually move files; just show what would happen
    #[arg(long, action = clap::ArgAction::SetTrue)]
    dry_run: bool,

    /// Recursively traverse subdirectories
    #[arg(short = 'r', long, action = clap::ArgAction::SetTrue, default_value_t = true)]
    recursive: bool,

    /// Only operate on files matching this extension (like "jpg,png" - no leading dots)
    #[arg(short = 'e', long, value_name = "EXTS", help = "Comma separated extensions to include (e.g. jpg,png,mp4)")]
    include_exts: Option<String>,

    /// Minimum file size to consider (bytes). 0 means all.
    #[arg(long, default_value_t = 0)]
    min_size: u64,

    /// Verbose output
    #[arg(short, long, action = clap::ArgAction::SetTrue)]
    verbose: bool,

    /// Actually perform operations. Without this the tool will run as a dry-run.
    #[arg(long, action = clap::ArgAction::SetTrue)]
    yes: bool,
}

#[derive(Copy, Clone, PartialEq, Eq, PartialOrd, Ord, ValueEnum, Debug)]
enum Mode {
    Extension,
    Mtime,
}

fn main() -> Result<()> {
    let cli = Cli::parse();

    // If the user didn't explicitly say "yes" and provided no flags (default run),
    // launch the wizard instead of erroring out.
    let (path, mode, dry_run, recursive, include_exts, min_size, verbose, yes) =
        if std::env::args().len() == 1 {
            run_wizard()?
        } else {
            (
                cli.path,
                cli.mode,
                cli.dry_run,
                cli.recursive,
                cli.include_exts
                    .as_deref()
                    .map(|s| {
                        s.split(',')
                            .map(|t| t.trim().to_lowercase())
                            .filter(|t| !t.is_empty())
                            .collect::<Vec<_>>()
                    })
                    .unwrap_or_default(),
                cli.min_size,
                cli.verbose,
                cli.yes,
            )
        };

    if dry_run && yes {
        eprintln!("--dry-run and --yes are incompatible: --dry-run will prevent actual changes.");
        std::process::exit(2);
    }

    organize_dir(
        &path,
        mode,
        dry_run || !yes, // if not yes => act like dry-run
        recursive,
        include_exts,
        min_size,
        verbose,
    )?;

    Ok(())
}

fn expand_path(input: &str) -> PathBuf {
    let mut s = input.to_string();

    // Expand ~ to home directory
    if s.starts_with("~") {
        if let Some(home) = dirs::home_dir() {
            s = home.join(s.trim_start_matches("~/")).to_string_lossy().to_string();
        }
    }

    // On Windows, expand %VAR% environment variables
    if cfg!(windows) {
        // simple expansion: replace %VAR% with env::var("VAR")
        while let Some(start) = s.find('%') {
            if let Some(end) = s[start + 1..].find('%') {
                let var_name = &s[start + 1..start + 1 + end];
                if let Ok(val) = env::var(var_name) {
                    s = s.replace(&format!("%{}%", var_name), &val);
                } else {
                    break;
                }
            } else {
                break;
            }
        }
    }

    PathBuf::from(s)
}

fn run_wizard() -> Result<(PathBuf, Mode, bool, bool, Vec<String>, u64, bool, bool)> {
    let theme = ColorfulTheme::default();

    let dir: String = Input::with_theme(&theme)
        .with_prompt("Enter the directory you want to organize")
        .default(".".into())
        .interact_text()?;
    let path = expand_path(&dir);

    let modes = &["By Extension", "By Modification Date"];
    let mode_selection = Select::with_theme(&theme)
        .with_prompt("Choose organization mode")
        .items(modes)
        .default(0)
        .interact()?;
    let mode = if mode_selection == 0 {
        Mode::Extension
    } else {
        Mode::Mtime
    };

    let recursive = Confirm::with_theme(&theme)
        .with_prompt("Scan subdirectories too?")
        .default(true)
        .interact()?;

    let include_exts: String = Input::with_theme(&theme)
        .with_prompt("Limit to specific extensions? (comma separated, blank = all)")
        .allow_empty(true)
        .interact_text()?;
    let include_exts = include_exts
        .split(',')
        .map(|s| s.trim().to_lowercase())
        .filter(|s| !s.is_empty())
        .collect::<Vec<_>>();

    let min_size: u64 = Input::with_theme(&theme)
        .with_prompt("Minimum file size to include (bytes)")
        .default(0)
        .interact_text()?;

    let verbose = Confirm::with_theme(&theme)
        .with_prompt("Enable verbose output?")
        .default(false)
        .interact()?;

    let dry_run = Confirm::with_theme(&theme)
        .with_prompt("Do a dry run (no files moved)?")
        .default(true)
        .interact()?;

    let yes = if dry_run {
        false
    } else {
        Confirm::with_theme(&theme)
            .with_prompt("Are you sure you want to move files?")
            .default(false)
            .interact()?
    };

    Ok((path, mode, dry_run, recursive, include_exts, min_size, verbose, yes))
}


/// Top-level directory walker and dispatcher
#[allow(clippy::too_many_arguments)]
fn organize_dir(
    root: &Path,
    mode: Mode,
    dry_run: bool,
    recursive: bool,
    include_exts: Vec<String>,
    min_size: u64,
    verbose: bool,
) -> Result<()> {
    if !root.exists() {
        anyhow::bail!("Path does not exist: {}", root.display());
    }
    if !root.is_dir() {
        anyhow::bail!("Path is not a directory: {}", root.display());
    }

    println!(
        "Organizing '{}' using mode {:?} {}",
        root.display(),
        mode,
        if dry_run { "(dry-run)" } else { "" }
    );

    let walker = WalkDir::new(root)
        .follow_links(false)
        .max_depth(if recursive { usize::MAX } else { 1 })
        .into_iter()
        .filter_entry(|e| !is_hidden(e.path()));

    for entry in walker {
        let entry = entry?;
        let path = entry.path();

        if path == root {
            continue;
        }

        if path.is_dir() {
            continue;
        }

        match process_file(path, root, mode, dry_run, &include_exts, min_size, verbose) {
            Ok(_) => {}
            Err(err) => {
                eprintln!("Error handling {}: {}", path.display(), err);
            }
        }
    }

    println!("Done.");

    Ok(())
}

fn is_hidden(p: &Path) -> bool {
    p.file_name()
        .and_then(OsStr::to_str)
        .map(|s| s.starts_with('.'))
        .unwrap_or(false)
}

#[allow(clippy::too_many_arguments)]
fn process_file(
    file_path: &Path,
    root: &Path,
    mode: Mode,
    dry_run: bool,
    include_exts: &[String],
    min_size: u64,
    verbose: bool,
) -> Result<()> {
    let meta = fs::metadata(file_path)
        .with_context(|| format!("reading metadata for {}", file_path.display()))?;
    let file_size = meta.len();

    if file_size < min_size {
        if verbose {
            println!(
                "Skipping {} (size {} < min {})",
                file_path.display(),
                file_size,
                min_size
            );
        }
        return Ok(());
    }

    // Determine destination folder (relative to root)
    let dest_dir = match mode {
        Mode::Extension => {
            let ext = file_path
                .extension()
                .and_then(OsStr::to_str)
                .map(|s| s.to_lowercase())
                .unwrap_or_else(|| "no_extension".to_string());

            if !include_exts.is_empty() && !include_exts.contains(&ext) {
                if verbose {
                    println!("Skipping {} (ext not included)", file_path.display());
                }
                return Ok(());
            }

            root.join(ext)
        }
        Mode::Mtime => {
            let modified = meta.modified().unwrap_or_else(|_| std::time::SystemTime::now());
            let dt: DateTime<Local> = DateTime::from(modified);
            let year = dt.format("%Y").to_string();
            let month = dt.format("%m").to_string();
            root.join(year).join(month)
        }
    };

    // ensure dest dir exists (or will be created)
    let file_name = file_path
        .file_name()
        .and_then(OsStr::to_str)
        .map(|s| s.to_string())
        .context("file has no name")?;

    let mut target = dest_dir.join(&file_name);

    // Prevent moving file into itself (same directory)
    if let Some(src_parent) = file_path.parent() {
        if src_parent == dest_dir {
            if verbose {
                println!("{} already in destination folder", file_path.display());
            }
            return Ok(());
        }
    }

    // Collision handling: if target exists, append (n)
    target = unique_destination(&target)?;

    if dry_run {
        println!("DRY: {} -> {}", file_path.display(), target.display());
        return Ok(());
    }

    // Make sure directory exists
    fs::create_dir_all(target.parent().expect("has parent"))
        .with_context(|| format!("creating directory {}", target.display()))?;

    fs::rename(file_path, &target)
        .with_context(|| format!("moving {} -> {}", file_path.display(), target.display()))?;

    if verbose {
        println!("Moved {} -> {}", file_path.display(), target.display());
    }

    Ok(())
}

/// If `path` exists, return a path with a numeric suffix like "name (1).ext", "name (2).ext"
fn unique_destination(path: &Path) -> Result<PathBuf> {
    if !path.exists() {
        return Ok(path.to_path_buf());
    }

    let parent = path.parent().context("destination has no parent")?;
    let stem = path
        .file_stem()
        .and_then(OsStr::to_str)
        .unwrap_or("file");
    let ext = path.extension().and_then(OsStr::to_str);

    for i in 1.. {
        let new_name = match ext {
            Some(e) => format!("{} ({}) .{}", stem, i, e),
            None => format!("{} ({})", stem, i),
        };
        let new_name = new_name.replace(" .", ".");

        let candidate = parent.join(new_name);
        if !candidate.exists() {
            return Ok(candidate);
        }
    }
    anyhow::bail!("couldn't find unique destination for {}", path.display());
}
