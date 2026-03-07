let todos = [];

const taskInput = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addBtn");
const taskList = document.querySelector("#taskList");
const completedCount = document.querySelector("#completedCount");
const totalCount = document.querySelector("#totalCount");

// render Todo 
function renderTodos () {
    if (todos.length === 0) {
        taskList.innerHTML = `
        <div class="empty-state">
        <div class="empty-state-icon">📋</div>
        <div class="empty-state-text">
          Chưa có công việc nào. Hãy thêm công việc mới!
        </div>
      </div>
      `;
    } else {
        taskList.innerHTML = todos.map(todo => { 
          const completed = todo.completed ? "completed" : "";
          const checked = todo.completed ? "checked" : "";

          const content = todo.isEditing ? `<input class="edit-input" value="${todo.name}">` : `<span class = "task-text" ${completed}>${todo.name}</span>`
          return `<div class="task-item" ${completed}" data-id="${todo.id}">
          <input type="checkbox" class="task-checkbox" ${checked}/>
          
         ${content}
          <div class="task-actions">
            <button class="btn-edit">✏️ Sửa</button>
            <button class="btn-delete">🗑️ Xóa</button>
          </div>
        </div>`
      }).join("");;
    }
    updateFooter();
}

// cập nhật chỉ số hoàn thành công việc
function updateFooter(){
  let total = todos.length;
  let completed = todos.filter(todo => todo.completed).length;

  totalCount.textContent = total;
  completedCount.textContent = completed;
}


// thêm công việc
function addToDo(){
  const value = taskInput.value.trim();
  if(value === "") return;
  let newToDo = {
    id: Date.now(),
    name: value,
    completed: false
  };

  todos.push(newToDo);
  taskInput.value = "";
  renderTodos();
}

addBtn.addEventListener("click", addToDo);
taskInput.addEventListener("keydown", (e) => {
  if(e.key === 'Enter'){
    addToDo();
  }
});

// Xử lý các sự kiện
taskList.addEventListener("click", (e) => {
  e.preventDefault();
  const taskItem = e.target.closest(".task-item");
  if(!taskItem) return;

  const id = Number(taskItem.dataset.id);

  // Toggle 
  if(e.target.classList.contains("task-checkbox")){
    todos = todos.map(todo => {
      if(id === todo.id){
        return {...todo, completed: !todo.completed};
      }
      return todo;
    });
    renderTodos();
  }

  // Sửa
  if(e.target.classList.contains("btn-edit")) {
      todos = todos.map(todo => {
        if(todo.id === id){
          return { ...todo, isEditing: true};
        }
        return todo;
      });
      renderTodos();
    }

  // Xoá
  if(e.target.classList.contains("btn-delete")) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
  }
});

// Lưu thay đổi
taskList.addEventListener('keydown', (e) => {
  if(!e.target.classList.contains("edit-input")) return;
  if(e.key === "Enter"){
    const taskItem = e.target.closest(".task-item");
    const id = +(taskItem.dataset.id);
    const newName = e.target.value.trim();
    if(!newName) return;
      todos = todos.map(todo => {
        if(todo.id === id){
          return { ...todo,name: newName,isEditing: false};
        }
        return todo;
      });
      renderTodos();
    }

})


document.addEventListener("DOMContentLoaded",renderTodos());