//Prioritize todos
function getRandomPriority() {
  //function to generate random priority, to avoid changes in html, or fixed priorities as js object
  return Math.floor(Math.random() * 3) + 1; //random num between 1 and 3
}

let todos = [];
const list = document.getElementById("todoList");
const newTodo = document.getElementById("newTodo");
const addButton = document.getElementById("addTodo");

function renderTodos() {
  list.innerHTML = "";

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = `[P${todo.priority}] ${todo.text}`;
    li.style.textDecoration = todo.completed ? "line-through" : "none";

    if (todo.priority === 1) li.style.borderLeft = "6px solid red";
    if (todo.priority === 2) li.style.borderLeft = "6px solid orange";
    if (todo.priority === 3) li.style.borderLeft = "6px solid green";

    li.onclick = () => {
      todo.completed = !todo.completed;
      renderTodos();
    };

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn"); // look up the class in CSS styles
    deleteButton.onclick = (e) => {
      e.stopPropagation(); // prevent toggle
      todos = todos.filter((t) => t.id !== todo.id);
      renderTodos();
    };
    li.appendChild(deleteButton);
    list.appendChild(li);
  });
}

addButton.onclick = () => {
  const task = newTodo.value.trim();
  if (!task) return;

  todos.push({
    id: Date.now(),
    text: task,
    completed: false,
    priority: getRandomPriority(),
  });

  sortTodos();
  newTodo.value = "";
  renderTodos();
};

function sortTodos() {
  todos.sort((a, b) => a.priority - b.priority);
}
