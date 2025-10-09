import json
import os
from datetime import datetime
from tabulate import tabulate

TASKS_FILE = "tasks.json"

# Load tasks
def load_tasks():
    if os.path.exists(TASKS_FILE):
        with open(TASKS_FILE, "r") as f:
            try:
                return json.load(f)
            except json.JSONDecodeError:
                return []
    return []

# Save tasks
def save_tasks(tasks):
    with open(TASKS_FILE, "w") as f:
        json.dump(tasks, f, indent=2)

# Add a new task
def add_task():
    title = input("Task Title: ").strip()
    description = input("Description (optional): ").strip()
    deadline = input("Deadline (YYYY-MM-DD) or leave blank: ").strip()
    importance = input("Importance (High/Medium/Low): ").strip().capitalize()
    urgency = input("Urgency (High/Medium/Low): ").strip().capitalize()

    if deadline:
        try:
            datetime.strptime(deadline, "%Y-%m-%d")
        except ValueError:
            print("Invalid date format. Task not added.")
            return

    tasks = load_tasks()
    tasks.append({
        "id": len(tasks) + 1,
        "title": title,
        "description": description,
        "deadline": deadline,
        "importance": importance,
        "urgency": urgency,
        "completed": False,
        "created_at": str(datetime.now())
    })
    save_tasks(tasks)
    print("Task added successfully!")

# View tasks sorted by priority
def view_tasks():
    tasks = load_tasks()
    if not tasks:
        print("No tasks found.")
        return

    # Assign numeric values for sorting
    importance_map = {"High": 3, "Medium": 2, "Low": 1}
    urgency_map = {"High": 3, "Medium": 2, "Low": 1}

    tasks_sorted = sorted(
        tasks,
        key=lambda t: (importance_map.get(t["importance"], 0) + urgency_map.get(t["urgency"], 0),
                       t["deadline"] if t["deadline"] else "9999-12-31"),
        reverse=True
    )

    table = []
    for t in tasks_sorted:
        table.append([
            t["id"], t["title"], t["description"][:30], t["deadline"], t["importance"], t["urgency"], "Yes" if t["completed"] else "No"
        ])

    print(tabulate(table, headers=["ID", "Title", "Description", "Deadline", "Importance", "Urgency", "Completed"]))

# Mark task as completed
def complete_task():
    view_tasks()
    try:
        task_id = int(input("Enter task ID to mark as completed: "))
        tasks = load_tasks()
        task = next((t for t in tasks if t["id"] == task_id), None)
        if task:
            task["completed"] = True
            save_tasks(tasks)
            print("Task marked as completed.")
        else:
            print("Invalid task ID.")
    except ValueError:
        print("Please enter a valid number.")

# Delete a task
def delete_task():
    view_tasks()
    try:
        task_id = int(input("Enter task ID to delete: "))
        tasks = load_tasks()
        tasks = [t for t in tasks if t["id"] != task_id]
        # Reassign IDs
        for idx, t in enumerate(tasks):
            t["id"] = idx + 1
        save_tasks(tasks)
        print("Task deleted.")
    except ValueError:
        print("Please enter a valid number.")

# Main menu
def main():
    while True:
        print("\n=== Task Prioritizer ===")
        print("1. Add Task")
        print("2. View Tasks")
        print("3. Mark Task as Completed")
        print("4. Delete Task")
        print("0. Exit")
        choice = input("Choose an option: ")

        if choice == "1":
            add_task()
        elif choice == "2":
            view_tasks()
        elif choice == "3":
            complete_task()
        elif choice == "4":
            delete_task()
        elif choice == "0":
            print("Goodbye!")
            break
        else:
            print("Invalid option. Try again.")

if __name__ == "__main__":
    main()
