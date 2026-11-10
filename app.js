const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const itemsLeft = document.getElementById("items-left");
const clearCompletedButton = document.getElementById("clear-completed");
const filters = document.querySelector(".filters");

let todos = [];
let currentFilter = "all";
let nextId = 1;

// Add a new task
todoForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const taskText = todoInput.value.trim();

    if (taskText === "") {
        return;
    }

    const todo = {
        id: nextId,
        text: taskText,
        completed: false
    };

    todos.push(todo);
    nextId++;

    todoInput.value = "";
    renderTodos();
});

// Create a task element
function createTodoElement(todo) {
    const li = document.createElement("li");
    li.classList.add("todo-item");
    li.dataset.id = todo.id;

    if (todo.completed) {
        li.classList.add("completed");
    }

    const span = document.createElement("span");
    span.classList.add("todo-text");
    span.textContent = todo.text;

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.dataset.action = "delete";
    deleteButton.textContent = "Delete";
    deleteButton.type = "button";

    li.appendChild(span);
    li.appendChild(deleteButton);

    return li;
}

// Display tasks
function renderTodos() {
    todoList.replaceChildren();

    const filteredTodos = todos.filter(function(todo) {
        if (currentFilter === "active") {
            return !todo.completed;
        }

        if (currentFilter === "completed") {
            return todo.completed;
        }

        return true;
    });

    filteredTodos.forEach(function(todo) {
        const todoElement = createTodoElement(todo);
        todoList.appendChild(todoElement);
    });

    const remaining = todos.filter(function(todo) {
        return !todo.completed;
    }).length;

    itemsLeft.textContent = remaining + " item" +
        (remaining === 1 ? "" : "s") + " left";
}

// Handle task clicks using event delegation
todoList.addEventListener("click", function(event) {
    const li = event.target.closest(".todo-item");

    if (!li) {
        return;
    }

    const todoId = Number(li.dataset.id);

    if (event.target.closest(".delete-button")) {
        todos = todos.filter(function(todo) {
            return todo.id !== todoId;
        });
    } else if (event.target.closest(".todo-text")) {
        const todo = todos.find(function(item) {
            return item.id === todoId;
        });

        todo.completed = !todo.completed;
    }

    renderTodos();
});

// Filter tasks
filters.addEventListener("click", function(event) {
    const filterButton = event.target.closest(".filter");

    if (!filterButton) {
        return;
    }

    currentFilter = filterButton.dataset.filter;

    document.querySelectorAll(".filter").forEach(function(button) {
        button.classList.toggle("active", button === filterButton);
    });

    renderTodos();
});

// Clear completed tasks
clearCompletedButton.addEventListener("click", function() {
    todos = todos.filter(function(todo) {
        return !todo.completed;
    });

    renderTodos();
});

// Edit a task by double-clicking it
todoList.addEventListener("dblclick", function(event) {
    const span = event.target.closest(".todo-text");

    if (!span) {
        return;
    }

    const li = span.closest(".todo-item");
    const todoId = Number(li.dataset.id);

    const input = document.createElement("input");
    input.type = "text";
    input.classList.add("edit-input");

    const todo = todos.find(function(item) {
        return item.id === todoId;
    });

    input.value = todo.text;

    span.replaceWith(input);
    input.focus();
    input.select();

    let editFinished = false;

    function saveEdit() {
        if (editFinished) return;
        editFinished = true;

        const newText = input.value.trim();

        if (newText !== "") {
            const todo = todos.find(function(item) {
                return item.id === todoId;
            });

            todo.text = newText;
        }

        renderTodos();
    }

    function cancelEdit() {
        if (editFinished) return;
        editFinished = true;

        renderTodos();
    }

    input.addEventListener("keydown", function(keyEvent) {
        if (keyEvent.key === "Enter") {
            saveEdit();
        }

        if (keyEvent.key === "Escape") {
            cancelEdit();
        }
    });

    input.addEventListener("blur", saveEdit, { once: true });
});

renderTodos();
