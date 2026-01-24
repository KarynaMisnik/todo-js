/*

Prioritize todos
function getRandomPriority() {
  function to generate random priority, to avoid changes in html, or fixed priorities as js object
  return Math.floor(Math.random() * 3) + 1; //random num between 1 and 3
}
*/

// Grab DOM elements
const newTodo = document.getElementById("newTodo");
const addTodo = document.getElementById("addTodo");
const list = document.getElementById("list");

// Selected priority (default HIGH)
let selectedPriority = 1; // 1 = HIGH, 2 = MEDIUM, 3 = LOW

// Grab dropdown links
const priorityLinks = document.querySelectorAll(".dropdown-content a");
priorityLinks.forEach((link) => {
  link.onclick = (e) => {
    e.preventDefault();
    const priorityText = link.textContent;
    if (priorityText === "HIGH") selectedPriority = 1;
    else if (priorityText === "MEDIUM") selectedPriority = 2;
    else if (priorityText === "LOW") selectedPriority = 3;

    // Optional: show selected priority in the button
    document.querySelector(".dropbtn").textContent = priorityText;
  };
});

// Array to store todos
let todos = [];

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

    li.style.textDecoration = todo.completed ? "line-through" : "none";
    li.textContent = `[${getPriorityText(todo.priority)}] ${todo.text}`;

    // Visual priority border
    if (todo.priority === 1) li.style.borderLeft = "6px solid red";
    if (todo.priority === 2) li.style.borderLeft = "6px solid orange";
    if (todo.priority === 3) li.style.borderLeft = "6px solid green";

    // Toggle completed
    li.onclick = () => {
      todo.completed = !todo.completed;
      renderTodos();
    };

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");
    deleteButton.onclick = (e) => {
      e.stopPropagation();
      todos = todos.filter((t) => t.id !== todo.id);
      renderTodos();
    };

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

  todos.push({
    id: Date.now(),
    text: task,
    completed: false,
    priority: selectedPriority,
  });

  sortTodos();
  renderTodos();
  newTodo.value = "";
};

// Initial render
renderTodos();
