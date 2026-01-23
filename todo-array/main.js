let todos = [];
const list = document.getElementById("todoList");
const newTodo = document.getElementById("newTodo");
const addButton = document.getElementById("addTodo");

function renderTodos() {
  list.innerHTML = "";

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo.text;
    li.style.textDecoration = todo.completed ? "line-through" : "none";

    li.onclick = () => {
      todo.completed = !todo.completed;
      renderTodos();
    };

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn"); // look up the class in CSS styles
    deleteButton.onclick = () => {
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

  todos.push({ id: Date.now(), text: task, completed: false });
  newTodo.value = "";
  renderTodos();
};
