// DOM elements
const newTodo = document.getElementById("newTodo");
const addTodo = document.getElementById("addTodo");
const list = document.getElementById("list");

// Selected priority (default HIGH)
let selectedPriority = 1; // 1 = HIGH, 2 = MEDIUM, 3 = LOW

// dropdown links
const priorityLinks = document.querySelectorAll(".dropdown-content a");
priorityLinks.forEach((link) => {
  link.onclick = (e) => {
    e.preventDefault();
    const priorityText = link.textContent;
    if (priorityText === "HIGH") selectedPriority = 1;
    else if (priorityText === "MEDIUM") selectedPriority = 2;
    else if (priorityText === "LOW") selectedPriority = 3;

    // show selected priority in the button
    document.querySelector(".dropbtn").textContent = priorityText;
  };
});

// Array to store todos
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Store todos in local storage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Sort todos by priority
function sortTodos() {
  todos.sort((a, b) => a.priority - b.priority);
}

function getPriorityText(priority) {
  if (priority === 1) return "HIGH";
  if (priority === 2) return "MEDIUM";
  return "LOW";
}

// Render todos
function renderTodos() {
  list.innerHTML = "";

  todos.forEach((todo) => {
    const li = document.createElement("li");

    const textSpan = document.createElement("span");
    textSpan.classList.add("todo-text");
    textSpan.textContent = `${todo.text} (${todo.priority})`;

    if (todo.completed) {
      textSpan.classList.add("done");
    }

    textSpan.addEventListener("click", () => {
      todo.completed = !todo.completed;
      saveTodos();
      renderTodos();
    });

    //li.style.textDecoration = todo.completed ? "line-through" : "none";
    //li.textContent = `[${getPriorityText(todo.priority)}] ${todo.text}`;

    // Visual priority border
    if (todo.priority === 1) li.style.borderLeft = "20px solid red";
    if (todo.priority === 2) li.style.borderLeft = "20px solid orange";
    if (todo.priority === 3) li.style.borderLeft = "20px solid green";

    // Toggle completed
    li.onclick = () => {
      todo.completed = !todo.completed;
      saveTodos();
      renderTodos();
    };

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");
    deleteButton.onclick = (e) => {
      e.stopPropagation();
      todos = todos.filter((t) => t.id !== todo.id);
      saveTodos();
      renderTodos();
    };
    li.appendChild(textSpan);
    li.appendChild(deleteButton);
    list.appendChild(li);
  });
}

// Add new todo
addTodo.onclick = () => {
  const task = newTodo.value.trim();
  if (!task) {
    alert("Field can't be empty");
    return;
  }

  const todo = {
    id: Date.now(),
    text: task,
    completed: false,
    priority: selectedPriority,
  };

  todos.push(todo);

  sortTodos();
  saveTodos();
  renderTodos();
  newTodo.value = "";
};

// Initial render
saveTodos();
renderTodos();
