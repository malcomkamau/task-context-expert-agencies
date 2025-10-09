import json
import os
from datetime import datetime
from tabulate import tabulate

DB_FILE = "campaign_ideas.json"

# Load ideas from JSON
def load_ideas():
    if os.path.exists(DB_FILE):
        with open(DB_FILE, "r") as f:
            return json.load(f)
    return []

# Save ideas to JSON
def save_ideas(ideas):
    with open(DB_FILE, "w") as f:
        json.dump(ideas, f, indent=2)

# Add a new idea
def add_idea():
    title = input("Title: ").strip()
    description = input("Description: ").strip()
    tags = input("Tags (comma-separated): ").strip().split(",")
    tags = [t.strip() for t in tags if t.strip()]
    
    ideas = load_ideas()
    ideas.append({
        "id": len(ideas) + 1,
        "title": title,
        "description": description,
        "tags": tags,
        "timestamp": str(datetime.now())
    })
    save_ideas(ideas)
    print("Idea added successfully!")

# List all ideas
def list_ideas():
    ideas = load_ideas()
    if not ideas:
        print("No ideas found.")
        return
    table = [[i["id"], i["title"], ", ".join(i["tags"]), i["timestamp"]] for i in ideas]
    print(tabulate(table, headers=["ID", "Title", "Tags", "Timestamp"]))

# Search ideas by keyword or tag
def search_ideas():
    keyword = input("Enter keyword or tag to search: ").strip().lower()
    ideas = load_ideas()
    results = [i for i in ideas if keyword in i["title"].lower() or
               keyword in i["description"].lower() or
               any(keyword == t.lower() for t in i["tags"])]
    if not results:
        print("No matching ideas found.")
        return
    table = [[i["id"], i["title"], ", ".join(i["tags"]), i["timestamp"]] for i in results]
    print(tabulate(table, headers=["ID", "Title", "Tags", "Timestamp"]))

# Delete an idea by ID
def delete_idea():
    list_ideas()
    try:
        idea_id = int(input("Enter the ID of the idea to delete: "))
        ideas = load_ideas()
        ideas = [i for i in ideas if i["id"] != idea_id]
        # Reassign IDs
        for idx, item in enumerate(ideas):
            item["id"] = idx + 1
        save_ideas(ideas)
        print("Idea deleted successfully!")
    except ValueError:
        print("Please enter a valid number.")

# Main menu
def main():
    while True:
        print("\n=== Campaign Idea Logger ===")
        print("1. Add Idea")
        print("2. List Ideas")
        print("3. Search Ideas")
        print("4. Delete Idea")
        print("0. Exit")
        choice = input("Choose an option: ")

        if choice == "1":
            add_idea()
        elif choice == "2":
            list_ideas()
        elif choice == "3":
            search_ideas()
        elif choice == "4":
            delete_idea()
        elif choice == "0":
            print("Goodbye!")
            break
        else:
            print("Invalid option. Try again.")

if __name__ == "__main__":
    main()
