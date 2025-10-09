import json
import os
import pyperclip
from cryptography.fernet import Fernet
from getpass import getpass
from datetime import datetime
from tabulate import tabulate

DB_FILE = "passwords.json"

# --- Encryption key ---
def load_key(master_password):
    key = master_password.ljust(32)[:32].encode()  # ensure 32 bytes
    return Fernet(Fernet.generate_key()) if not os.path.exists(DB_FILE) else Fernet(Fernet.generate_key())

# --- Load and save ---
def load_db(f):
    if os.path.exists(DB_FILE):
        with open(DB_FILE, "rb") as file:
            encrypted = file.read()
            if encrypted:
                decrypted = f.decrypt(encrypted)
                return json.loads(decrypted)
    return []

def save_db(f, db):
    data = json.dumps(db).encode()
    encrypted = f.encrypt(data)
    with open(DB_FILE, "wb") as file:
        file.write(encrypted)

# --- Password operations ---
def add_entry(f):
    account = input("Account/Service name: ").strip()
    username = input("Username: ").strip()
    password = getpass("Password (leave empty to auto-generate): ").strip()
    if not password:
        import secrets, string
        password = "".join(secrets.choice(string.ascii_letters + string.digits + string.punctuation) for _ in range(16))
        print(f"Generated password: {password}")

    db = load_db(f)
    db.append({
        "id": len(db)+1,
        "account": account,
        "username": username,
        "password": password,
        "timestamp": str(datetime.now())
    })
    save_db(f, db)
    print("Password saved!")

def list_entries(f, show_all=False):
    db = load_db(f)
    if not db:
        print("No entries found.")
        return []
    table = [[e["id"], e["account"], e["username"], "*"*len(e["password"]), e["timestamp"]] for e in db] if not show_all else \
            [[e["id"], e["account"], e["username"], e["password"], e["timestamp"]] for e in db]
    print(tabulate(table, headers=["ID", "Account", "Username", "Password", "Added"]))
    return db

def copy_password(f):
    db = list_entries(f)
    if not db: return
    try:
        entry_id = int(input("Enter ID to copy password: "))
        entry = next((e for e in db if e["id"] == entry_id), None)
        if entry:
            pyperclip.copy(entry["password"])
            print("Password copied to clipboard!")
        else:
            print("Invalid ID.")
    except ValueError:
        print("Please enter a valid number.")

def delete_entry(f):
    db = list_entries(f)
    if not db: return
    try:
        entry_id = int(input("Enter ID to delete: "))
        db = [e for e in db if e["id"] != entry_id]
        # reassign IDs
        for idx, item in enumerate(db):
            item["id"] = idx+1
        save_db(f, db)
        print("Entry deleted.")
    except ValueError:
        print("Please enter a valid number.")

def update_entry(f):
    db = list_entries(f)
    if not db: return
    try:
        entry_id = int(input("Enter ID to update: "))
        entry = next((e for e in db if e["id"] == entry_id), None)
        if not entry:
            print("Invalid ID.")
            return
        print("Leave empty to keep current value.")
        account = input(f"Account [{entry['account']}]: ").strip() or entry["account"]
        username = input(f"Username [{entry['username']}]: ").strip() or entry["username"]
        password = getpass(f"Password [{'*'*len(entry['password'])}]: ").strip() or entry["password"]

        entry.update({"account": account, "username": username, "password": password})
        save_db(f, db)
        print("Entry updated.")
    except ValueError:
        print("Please enter a valid number.")

def search_entries(f):
    keyword = input("Enter keyword to search: ").strip().lower()
    db = load_db(f)
    results = [e for e in db if keyword in e["account"].lower() or keyword in e["username"].lower()]
    if not results:
        print("No entries found.")
        return
    table = [[e["id"], e["account"], e["username"], "*"*len(e["password"]), e["timestamp"]] for e in results]
    print(tabulate(table, headers=["ID", "Account", "Username", "Password", "Added"]))

# --- Main menu ---
def main():
    master_password = getpass("Enter master password: ")
    f = load_key(master_password)

    while True:
        print("\n=== Password Manager ===")
        print("1. Add password")
        print("2. List passwords")
        print("3. Copy password")
        print("4. Update entry")
        print("5. Delete entry")
        print("6. Search entries")
        print("0. Exit")
        choice = input("Choose an option: ")

        if choice == "1":
            add_entry(f)
        elif choice == "2":
            list_entries(f)
        elif choice == "3":
            copy_password(f)
        elif choice == "4":
            update_entry(f)
        elif choice == "5":
            delete_entry(f)
        elif choice == "6":
            search_entries(f)
        elif choice == "0":
            print("Goodbye!")
            break
        else:
            print("Invalid choice. Try again.")

if __name__ == "__main__":
    main()
