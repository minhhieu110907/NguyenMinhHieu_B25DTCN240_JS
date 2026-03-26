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

const statsContainer = document.createElement("div");
statsContainer.className = "stats-container";
document.querySelector(".header").after(statsContainer);

const clearAllBtn = document.createElement("button");
clearAllBtn.className = "btn-clear-all";
clearAllBtn.innerText = "Xóa toàn bộ danh sách";
document.querySelector(".card").insertBefore(clearAllBtn, document.querySelector(".footer"));

let todos;
let editingId = null;

let savedTodo = localStorage.getItem("myTodos");
if (savedTodo) {
  todos = JSON.parse(savedTodo);
} else {
  todos = initialTodos;
  localStorage.setItem("myTodos", JSON.stringify(todos));
}

function renderTodos() {
  const total = todos.length;
  const completed = todos.filter((t) => t.done).length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
  statsContainer.innerHTML = `Tổng công việc: ${total} | Đã hoàn thành: ${completed} (${percent}%)`;

  if (total === 0) {
    todoList.innerHTML = `<li class="empty-msg">Chưa có công việc nào...</li>`;
    clearAllBtn.style.display = "none";
    return;
  }

  clearAllBtn.style.display = "block";
  todoList.innerHTML = todos
    .map((todo) => {
      const isEditing = todo.id === editingId;
      return `
        <li class="todo-item ${todo.done ? "done" : ""}" data-id="${todo.id}">
            <div class="todo-content">
                <span class="status-icon">${todo.done ? "✔" : "○"}</span>
                ${isEditing 
                  ? `<input type="text" class="edit-input" value="${todo.task}">` 
                  : `<span class="task-text">${todo.task}</span>`
                }
            </div>
            <div class="todo-actions">
                <button class="btn-edit">${isEditing ? "💾" : "✏️"}</button>
                <button class="btn-delete">🗑️</button>
            </div>
        </li>`;
    })
    .join("");

  if (editingId !== null) {
    const editInput = document.querySelector(".edit-input");
    if (editInput) {
      editInput.focus();
      editInput.select();
      editInput.onkeydown = (e) => {
        if (e.key === "Enter") saveEdit(editingId, editInput.value);
        if (e.key === "Escape") {
          editingId = null;
          renderTodos();
        }
      };
    }
  }
}

function saveAndRender() {
  localStorage.setItem("myTodos", JSON.stringify(todos));
  renderTodos();
}

function addTask() {
  let value = input.value.trim();
  if (!value) return;
  let newID = todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1;
  todos.push({ id: newID, task: value, done: false });
  input.value = "";
  saveAndRender();
}

function saveEdit(id, newValue) {
  let val = newValue.trim();
  if (val === "") {
    alert("Tên công việc không được để trống!");
    return;
  }
  let item = todos.find((t) => t.id === id);
  if (item) item.task = val;
  editingId = null;
  saveAndRender();
}

addBtn.addEventListener("click", addTask);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

clearAllBtn.addEventListener("click", () => {
  if (window.confirm("Bạn có chắc chắn muốn xóa toàn bộ danh sách không? Hành động này không thể hoàn tác.")) {
    todos = [];
    saveAndRender();
  }
});

todoList.addEventListener("click", function (e) {
  let itemEl = e.target.closest(".todo-item");
  if (!itemEl) return;
  let id = +itemEl.dataset.id;

  if (e.target.closest(".btn-delete")) {
    if (window.confirm("Bạn có chắc chắn muốn xóa công việc này?")) {
      todos = todos.filter((todo) => todo.id !== id);
      saveAndRender();
    }
    return;
  }

  if (e.target.closest(".btn-edit")) {
    if (editingId === id) {
      const editInput = itemEl.querySelector(".edit-input");
      saveEdit(id, editInput.value);
    } else {
      editingId = id;
      renderTodos();
    }
    return;
  }

  if (editingId === null) {
    let item = todos.find((todo) => todo.id === id);
    if (item) {
      item.done = !item.done;
      saveAndRender();
    }
  }
});

renderTodos();