const initialTodos = [
  { id: 1, task: "Mua bánh chưng", done: true },
  { id: 2, task: "Dọn nhà đón Tết", done: true },
  { id: 3, task: "Gói bánh chưng", done: false },
  { id: 4, task: "Trang trí nhà cửa bằng hoa mai, hoa đào", done: false },
  { id: 5, task: "Mua phong bao lì xì", done: false },
  { id: 6, task: "Chuẩn bị mâm ngũ quả", done: false },
];
let todoList = document.querySelector("#todoList");
let addBtn = document.querySelector("#addBtn");
let input = document.querySelector("#taskInput");

let todos;
let savedTodo = localStorage.getItem("myTodo");
if (savedTodo) {
  todos = JSON.parse(savedTodo);
} else {
  todos = initialTodos;
  localStorage.setItem("myTodo", JSON.stringify(todos));
}

function renderTodos() {
  if (todos.length === 0) {
    todoList.innerHTML = `<li> Chưa có công việc nào...</li>`;
    return;
  } else {
    todoList.innerHTML = todos
      .map((todo) => {
        return `<li class = "todo-item ${todo.done ? "done" : ""}" data-id = "${todo.id}">
            <span>${todo.task}</span>
            <span>${todo.done ? "✔" : "○"}</span>
            </li>`;
      })
      .join("");
  }
}

function addTask() {
  let value = input.value.trim();
  if (!value) return;
  let newID = Math.max(...todos.map((t) => t.id)) + 1;
  let todoNewList = {
    id: newID,
    task: value,
    done: false,
  };

  todos.push(todoNewList);
  input.value = "";
  renderTodos();
  localStorage.setItem("myTodo", JSON.stringify(todos));
}

addBtn.addEventListener("click", addTask);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

todoList.addEventListener("click", function (e) {
  let clickedItem = e.target.closest(".todo-item");
  if (!clickedItem) return;

  let id = +clickedItem.dataset.id;
  let item = todos.find((todo) => todo.id === id);
  if (item) {
    item.done = !item.done;
    renderTodos();
    localStorage.setItem("myTodo", JSON.stringify(todos));
  }
});

renderTodos();
