const todos = [
  { id: 1, task: "Mua bánh chưng", done: false },
  { id: 2, task: "Dọn nhà đón Tết", done: false },
  { id: 3, task: "Gói bánh chưng", done: false },
  { id: 4, task: "Trang trí nhà cửa", done: false },
];

let todoList = document.querySelector('#todoList');

function renderTodos() {
    if ( todos.length === 0){
        todoList.innerHTML = `<li>Chưa có công việc nào</li>`; 
    } else {
        todoList.innerHTML = todos.map(todo => {
            return `<li class="todo-item">
                    <span>🌸 ${todo.task}</span>
                    <span class="status">${todo.done ? "Đã làm" : "Chưa làm"}</span>
                </li>`
        }).join("");
    }
}

renderTodos();
if(!localStorage.getItem("myTodo")) {
    const todoJSON = JSON.stringify(todos);
    localStorage.setItem("myTodo", todoJSON);
}
