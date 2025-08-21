// JS
const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");
const search = document.getElementById("search");
const toggleTheme = document.getElementById("toggle-theme");
const loader = document.getElementById("loader");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let isDark = JSON.parse(localStorage.getItem("darkMode")) || false;

const saveTodos = () => localStorage.setItem("todos", JSON.stringify(todos));
const saveTheme = () =>
  localStorage.setItem("darkMode", JSON.stringify(isDark));

const applyTheme = () => {
  document.body.classList.toggle("dark", isDark);
};

const renderTodos = (filter = "") => {
  list.innerHTML = "";
  todos
    .filter((todo) => todo.text.toLowerCase().includes(filter.toLowerCase()))
    .forEach((todo, index) => {
      const li = document.createElement("li");
      li.className = todo.done ? "done" : "";
      const span = document.createElement("span");
      span.textContent = todo.text;
      const actions = document.createElement("div");
      actions.className = "actions";

      const toggleBtn = document.createElement("button");
      toggleBtn.textContent = todo.done ? "Undo" : "Done";
      toggleBtn.onclick = () => {
        todos[index].done = !todos[index].done;
        saveTodos();
        renderTodos(search.value);
      };

      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.onclick = () => {
        todos.splice(index, 1);
        saveTodos();
        renderTodos(search.value);
      };

      actions.append(toggleBtn, delBtn);
      li.append(span, actions);
      list.appendChild(li);
    });
};

addBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (text) {
    todos.push({ text, done: false });
    saveTodos();
    input.value = "";
    renderTodos(search.value);
  }
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addBtn.click();
});

search.addEventListener("input", () => renderTodos(search.value));

toggleTheme.addEventListener("click", () => {
  isDark = !isDark;
  applyTheme();
  saveTheme();
});

async function loadData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1500);
  });
}

async function init() {
  loader.style.display = "flex";

  await loadData();

  loader.style.display = "none";

  applyTheme();
  renderTodos();
}

init();
