[Setup]
AppName=OrganizeFS
AppVersion=0.1.0
DefaultDirName={autopf}\OrganizeFS
DefaultGroupName=OrganizeFS
OutputBaseFilename=OrganizeFS-Setup
Compression=lzma
SolidCompression=yes

[Files]
Source: "target\release\organize-fs.exe"; DestDir: "{app}"; Flags: ignoreversion

[Icons]
Name: "{group}\OrganizeFS"; Filename: "{app}\organize-fs.exe"
Name: "{commondesktop}\OrganizeFS"; Filename: "{app}\organize-fs.exe"

[Run]
Filename: "{app}\organize-fs.exe"; Description: "Run OrganizeFS"; Flags: nowait postinstall
