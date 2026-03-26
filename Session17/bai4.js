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
    todoList.innerHTML = `<li style="text-align:center; list-style:none; color:#999;">Chưa có công việc nào...</li>`;
    return;
  }
  
  todoList.innerHTML = todos
    .map((todo) => {
      return `
        <li class="todo-item ${todo.done ? "done" : ""}" data-id="${todo.id}">
            <div class="todo-content">
                <span class="status-icon">${todo.done ? "✔" : "○"}</span>
                <span class="task-text">${todo.task}</span>
            </div>
            <button class="btn-delete" data-id="${todo.id}">Xóa</button>
        </li>`;
    })
    .join("");
}

function addTask() {
  let value = input.value.trim();
  if (!value) return;


  let newID = todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1;
  
  let todoNewList = {
    id: newID,
    task: value,
    done: false,
  };

  todos.push(todoNewList);
  input.value = "";
  saveAndRender();
}


function saveAndRender() {
  localStorage.setItem("myTodo", JSON.stringify(todos));
  renderTodos();
}

addBtn.addEventListener("click", addTask);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});


todoList.addEventListener("click", function (e) {
  let id = +e.target.closest(".todo-item").dataset.id;


  if (e.target.classList.contains("btn-delete")) {
    let confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa công việc này?");
    if (confirmDelete) {
      todos = todos.filter((todo) => todo.id !== id);
      saveAndRender();
    }
    return; 
  }

  let item = todos.find((todo) => todo.id === id);
  if (item) {
    item.done = !item.done;
    saveAndRender();
  }
});

renderTodos();