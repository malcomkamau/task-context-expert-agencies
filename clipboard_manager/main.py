import pyperclip
import json
import os
from datetime import datetime
from tabulate import tabulate
from colorama import init, Fore, Style

init(autoreset=True)

DB_FILE = "clipboard_history.json"

# Load history from JSON
def load_history():
    if os.path.exists(DB_FILE):
        with open(DB_FILE, "r") as f:
            return json.load(f)
    return []

# Save history to JSON
def save_history(history):
    with open(DB_FILE, "w") as f:
        json.dump(history, f, indent=2)

# Add current clipboard content
def add_item():
    content = pyperclip.paste().strip()
    if not content:
        print(Fore.YELLOW + "Clipboard is empty. Nothing to add.")
        return
    history = load_history()
    history.append({
        "id": len(history) + 1,
        "content": content,
        "pinned": False,
        "timestamp": str(datetime.now())
    })
    save_history(history)
    pyperclip.copy(content)
    print(Fore.GREEN + "Clipboard content saved and ready to use!")

# List all items
def list_items(items=None):
    history = items if items is not None else load_history()
    if not history:
        print(Fore.YELLOW + "No clipboard history found.")
        return
    # Sort pinned items first
    history = sorted(history, key=lambda x: not x["pinned"])
    table = [
        [item["id"], ("📌 " if item["pinned"] else "") + item["content"][:40], item["timestamp"]]
        for item in history
    ]
    print(tabulate(table, headers=["ID", "Content", "Timestamp"]))

# Copy item back to clipboard
def copy_item():
    list_items()
    try:
        item_id = int(input("Enter the ID of the item to copy: "))
        history = load_history()
        item = next((i for i in history if i["id"] == item_id), None)
        if item:
            pyperclip.copy(item["content"])
            print(Fore.GREEN + "Item copied to clipboard!")
        else:
            print(Fore.RED + "Invalid ID.")
    except ValueError:
        print(Fore.RED + "Please enter a valid number.")

# Search items
def search_items():
    keyword = input("Enter keyword to search: ").strip().lower()
    history = load_history()
    results = [i for i in history if keyword in i["content"].lower()]
    if not results:
        print(Fore.YELLOW + "No items found.")
        return
    # Highlight keyword in content
    table = [
        [
            item["id"],
            item["content"].replace(keyword, Fore.RED + keyword + Style.RESET_ALL)[:40],
            ("📌 " if item["pinned"] else "") + item["timestamp"]
        ]
        for item in results
    ]
    print(tabulate(table, headers=["ID", "Content", "Timestamp"]))

# Delete an item
def delete_item():
    list_items()
    try:
        item_id = int(input("Enter the ID of the item to delete: "))
        history = load_history()
        item = next((i for i in history if i["id"] == item_id), None)
        if not item:
            print(Fore.RED + "Invalid ID.")
            return
        confirm = input("Are you sure you want to delete this item? (y/n): ")
        if confirm.lower() == "y":
            history = [i for i in history if i["id"] != item_id]
            for idx, item in enumerate(history):
                item["id"] = idx + 1
            save_history(history)
            print(Fore.GREEN + "Item deleted.")
        else:
            print(Fore.YELLOW + "Deletion cancelled.")
    except ValueError:
        print(Fore.RED + "Please enter a valid number.")

# Clear all items
def clear_history():
    confirm = input("Are you sure you want to clear all history? (y/n): ")
    if confirm.lower() == "y":
        save_history([])
        print(Fore.GREEN + "All history cleared!")
    else:
        print(Fore.YELLOW + "Clear history cancelled.")

# Pin/unpin items
def toggle_pin():
    list_items()
    try:
        item_id = int(input("Enter the ID of the item to pin/unpin: "))
        history = load_history()
        item = next((i for i in history if i["id"] == item_id), None)
        if item:
            item["pinned"] = not item["pinned"]
            save_history(history)
            status = "pinned" if item["pinned"] else "unpinned"
            print(Fore.GREEN + f"Item {status}.")
        else:
            print(Fore.RED + "Invalid ID.")
    except ValueError:
        print(Fore.RED + "Please enter a valid number.")

# Main menu
def main():
    while True:
        print("\n=== Clipboard Manager ===")
        print("1. Add current clipboard")
        print("2. List history")
        print("3. Copy item to clipboard")
        print("4. Search items")
        print("5. Delete item")
        print("6. Clear all history")
        print("7. Pin/Unpin item")
        print("0. Exit")
        choice = input("Choose an option: ")

        if choice == "1":
            add_item()
        elif choice == "2":
            list_items()
        elif choice == "3":
            copy_item()
        elif choice == "4":
            search_items()
        elif choice == "5":
            delete_item()
        elif choice == "6":
            clear_history()
        elif choice == "7":
            toggle_pin()
        elif choice == "0":
            print(Fore.CYAN + "Goodbye!")
            break
        else:
            print(Fore.RED + "Invalid option. Try again.")

if __name__ == "__main__":
    main()
