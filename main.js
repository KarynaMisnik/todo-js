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

document.getElementById("logPriorities").addEventListener("click", () => {
  const items = document.querySelectorAll(".list-container li");
  items.forEach((li) => {
    console.log(li.dataset.priority); // logs 1, 2, 3...
  });
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

document.getElementById("sortButton").addEventListener("click", () => {
  sortTodos(); // sorts array
  renderTodos(); // updates UI
});

// Render todos
function renderTodos() {
  list.innerHTML = "";

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.style.backgroundColor = "var(--light-grey)";

    const textSpan = document.createElement("span");
    textSpan.classList.add("todo-text");
    textSpan.textContent = `${todo.text} (${todo.priority})`;

    //dataset priority
    li.dataset.priority = todo.priority;

    document.getElementById("logPriorities").addEventListener("click", () => {
      const items = document.querySelectorAll("#todoList li");
      items.forEach((li) => {
        console.log(li.dataset.priority);
      });
    });

    if (todo.completed) {
      textSpan.classList.add("done");
    }

    textSpan.addEventListener("click", () => {
      todo.completed = !todo.completed;
      saveTodos();
      renderTodos();
    });

    li.style.textDecoration = todo.completed ? "line-through" : "none";
    li.textContent = `[${getPriorityText(todo.priority)}] ${todo.text}`;

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

  //sortTodos();
  saveTodos();
  renderTodos();
  newTodo.value = "";
};

// Initial render
saveTodos();
renderTodos();

// Fetch JSON data

fetch("course.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data); // your parsed object
    document.getElementById("course-name").textContent =
      data.course["courseName"];
    document.getElementById("status").textContent = data.course.status
      ? "Active"
      : "Inactive";
    document.getElementById("teacher").textContent =
      data.course.teacher[0]["name"];
    document.getElementById("students").innerHTML = "";
    data.course.students.forEach((student) => {
      const li = document.createElement("li");
      li.style.backgroundColor = undefined;
      li.textContent = student["name"];
      document.getElementById("students").appendChild(li);
    });
  });

// Fetch Joke API

async function getJoke() {
  try {
    const response = await fetch(
      "https://official-joke-api.appspot.com/jokes/programming/random",
    );
    const data = await response.json();
    const joke = data[0];

    document.getElementById("setup").textContent = joke.setup;
    document.getElementById("punchline").textContent = joke.punchline;
  } catch (error) {
    console.error("Error fetching joke:", error);
  }
}

getJoke();
