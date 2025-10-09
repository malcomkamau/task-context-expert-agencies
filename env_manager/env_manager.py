import os
import json
from tabulate import tabulate
from colorama import init, Fore, Style

init(autoreset=True)

DB_FILE = "env_vars.json"

def load_env_vars():
    # Create the file if it doesn't exist
    if not os.path.exists(DB_FILE):
        with open(DB_FILE, "w") as f:
            json.dump({}, f)
        return {}

    # Load existing file safely
    with open(DB_FILE, "r") as f:
        try:
            return json.load(f)
        except json.JSONDecodeError:
            # Handle empty or corrupted file
            return {}


def save_env_vars(env_vars):
    with open(DB_FILE, "w") as f:
        json.dump(env_vars, f, indent=2)

def list_vars(env_vars):
    if not env_vars:
        print(Fore.YELLOW + "No environment variables found.")
        return
    table = [[k, v] for k, v in env_vars.items()]
    print(tabulate(table, headers=["Variable", "Value"]))

def add_or_update_var(env_vars):
    name = input("Enter variable name: ").strip()
    value = input("Enter variable value: ").strip()
    env_vars[name] = value
    save_env_vars(env_vars)
    print(Fore.GREEN + f"Variable '{name}' saved.")

def delete_var(env_vars):
    list_vars(env_vars)
    name = input("Enter variable name to delete: ").strip()
    if name in env_vars:
        del env_vars[name]
        save_env_vars(env_vars)
        print(Fore.GREEN + f"Variable '{name}' deleted.")
    else:
        print(Fore.RED + "Variable not found.")

def search_vars(env_vars):
    keyword = input("Enter keyword to search: ").strip().lower()
    results = {k:v for k,v in env_vars.items() if keyword in k.lower() or keyword in v.lower()}
    if not results:
        print(Fore.YELLOW + "No matches found.")
        return
    table = [[k, v] for k, v in results.items()]
    print(tabulate(table, headers=["Variable", "Value"]))

def main():
    env_vars = load_env_vars()
    while True:
        print("\n=== Environment Variables Manager ===")
        print("1. List variables")
        print("2. Add / Update variable")
        print("3. Delete variable")
        print("4. Search variables")
        print("0. Exit")
        choice = input("Choose an option: ")

        if choice == "1":
            list_vars(env_vars)
        elif choice == "2":
            add_or_update_var(env_vars)
        elif choice == "3":
            delete_var(env_vars)
        elif choice == "4":
            search_vars(env_vars)
        elif choice == "0":
            print(Fore.CYAN + "Goodbye!")
            break
        else:
            print(Fore.RED + "Invalid option. Try again.")

if __name__ == "__main__":
    main()
