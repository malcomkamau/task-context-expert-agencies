import os
from pathlib import Path
from collections import defaultdict
import humanize
from tabulate import tabulate
import json
from tqdm import tqdm
from colorama import init, Fore, Style

# Initialize colorama
init(autoreset=True)

def list_drives():
    drives = [f"{d}:\\" for d in "ABCDEFGHIJKLMNOPQRSTUVWXYZ" if os.path.exists(f"{d}:\\")]
    return drives

def scan_folder(folder_path):
    folder_sizes = defaultdict(int)
    file_types = defaultdict(int)
    files_list = []

    all_files = []
    for root, dirs, files in os.walk(folder_path):
        for name in files:
            file_path = Path(root) / name
            all_files.append(file_path)

    print(f"\nScanning {len(all_files)} files in {folder_path}...\n")
    for file_path in tqdm(all_files, desc="Scanning files", unit="file"):
        try:
            size = file_path.stat().st_size
            files_list.append((file_path, size))
            folder_sizes[str(file_path.parent)] += size
            ext = file_path.suffix.lower() or "no_extension"
            file_types[ext] += size
        except Exception:
            continue  # skip inaccessible files

    return files_list, folder_sizes, file_types

def display_top_files(files_list, top_n=10):
    files_list.sort(key=lambda x: x[1], reverse=True)
    top_files = [(str(f[0]), humanize.naturalsize(f[1])) for f in files_list[:top_n]]
    print(Fore.CYAN + "\nTop 10 Largest Files:")
    print(tabulate(top_files, headers=["File Path", "Size"], tablefmt="fancy_grid"))

def display_top_folders(folder_sizes, top_n=5):
    sorted_folders = sorted(folder_sizes.items(), key=lambda x: x[1], reverse=True)[:top_n]
    top_folders = [(folder, humanize.naturalsize(size)) for folder, size in sorted_folders]
    print(Fore.MAGENTA + "\nTop 5 Largest Folders:")
    print(tabulate(top_folders, headers=["Folder Path", "Size"], tablefmt="fancy_grid"))

def display_file_types(file_types):
    sorted_types = sorted(file_types.items(), key=lambda x: x[1], reverse=True)
    type_table = [(ft, humanize.naturalsize(sz)) for ft, sz in sorted_types]
    print(Fore.GREEN + "\nBreakdown by File Type:")
    print(tabulate(type_table, headers=["File Type", "Total Size"], tablefmt="fancy_grid"))

def main():
    print(Fore.YELLOW + "Welcome to Disk Usage Analyzer!\n")

    drives = list_drives()
    for idx, drive in enumerate(drives, 1):
        print(f"{idx}. {drive}")
    print(f"{len(drives)+1}. Enter a custom folder path")

    choice = input(Fore.YELLOW + "\nEnter your choice: ").strip()

    if choice == str(len(drives)+1):
        folder_path = input(Fore.YELLOW + "Enter folder path: ").strip()
        if not os.path.exists(folder_path):
            print(Fore.RED + "Invalid path. Exiting...")
            return
    else:
        try:
            folder_path = drives[int(choice)-1]
        except:
            print(Fore.RED + "Invalid choice. Scanning C:\\ as default.")
            folder_path = "C:\\"

    files_list, folder_sizes, file_types = scan_folder(folder_path)

    display_top_files(files_list)
    display_top_folders(folder_sizes)
    display_file_types(file_types)

    save = input(Fore.YELLOW + "\nDo you want to save the results? (y/n): ").strip().lower()
    if save == "y":
        filename = input(Fore.YELLOW + "Enter filename (e.g., disk_report.json): ").strip()
        report = {
            "top_files": [(str(f[0]), f[1]) for f in files_list[:10]],
            "top_folders": [(f, s) for f, s in folder_sizes.items()],
            "file_types": dict(file_types)
        }
        with open(filename, "w") as f:
            json.dump(report, f, indent=4)
        print(Fore.GREEN + f"Results saved to {filename}")

if __name__ == "__main__":
    main()
