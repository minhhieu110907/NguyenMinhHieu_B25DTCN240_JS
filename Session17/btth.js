const products = [
    { id: 1, name: "Bánh Chưng Tranh Khúc", price: 150000, img: "./imbanhchung.webp" },
    { id: 2, name: "Giò Lụa Ước Lễ", price: 180000, img: "./img/giolua.jpg" },
    { id: 3, name: "Cành Đào Nhật Tân", price: 500000, img: "./img/canhdao.webp" },
    { id: 4, name: "Mứt Tết Thập Cẩm", price: 120000, img: "./img/muttet.webp" },
    { id: 5, name: "Lì Xì May Mắn", price: 20000, img: "./img/lixi.webp" },
    { id: 6, name: "Dưa Hấu Khắc Chữ", price: 60000, img: "./img/duahau.jpg" }
];
const products = [
  { id: 1, name: "A", price: 30 },
  { id: 2, name: "B", price: 60 },
  { id: 3, name: "C", price: 20 },
  { id: 4, name: "D", price: 80 },
  { id: 5, name: "E", price: 10 },
  { id: 6, name: "F", price: 55 },
  { id: 7, name: "G", price: 40 },
  { id: 8, name: "H", price: 90 },
];

let filteredProducts = [...products];
let currentPage = 1;
const pageSize = 3;
let editingId = null;

// DOM
const list = document.getElementById("list");
const pagination = document.getElementById("pagination");
const searchInput = document.getElementById("search");
const filterSelect = document.getElementById("filter");


// =======================
// FILTER + SEARCH
// =======================
function applyFilter() {
  const keyword = searchInput.value.toLowerCase();
  const filterValue = filterSelect.value;

  filteredProducts = products.filter(p => {
    const matchName = p.name.toLowerCase().includes(keyword);

    let matchPrice = true;
    if (filterValue === "cheap") matchPrice = p.price < 50;
    if (filterValue === "expensive") matchPrice = p.price >= 50;

    return matchName && matchPrice;
  });

  currentPage = 1;
  render();
}


// =======================
// RENDER PRODUCTS
// =======================
function renderProducts() {
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;

  const data = filteredProducts.slice(start, end);

  list.innerHTML = data.map(p => `
    <li>
      ${editingId === p.id
        ? `<input value="${p.name}" class="edit-input" />
           <button class="save-btn" data-id="${p.id}">Save</button>`
        : `${p.name} - ${p.price}
           <button class="edit-btn" data-id="${p.id}">Edit</button>`
      }
      <button class="delete-btn" data-id="${p.id}">Delete</button>
    </li>
  `).join("");
}


// =======================
// RENDER PAGINATION
// =======================
function renderPagination() {
  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  let html = "";

  for (let i = 1; i <= totalPages; i++) {
    html += `
      <button 
        class="page-btn ${i === currentPage ? "active" : ""}" 
        data-page="${i}">
        ${i}
      </button>
    `;
  }

  pagination.innerHTML = html;
}


// =======================
// MAIN RENDER
// =======================
function render() {
  renderProducts();
  renderPagination();
}


// =======================
// EVENTS
// =======================

// search
searchInput.addEventListener("input", applyFilter);

// filter
filterSelect.addEventListener("change", applyFilter);


// pagination click
pagination.addEventListener("click", (e) => {
  const btn = e.target.closest(".page-btn");
  if (!btn) return;

  currentPage = Number(btn.dataset.page);
  render();
});


// list actions (edit / delete / save)
list.addEventListener("click", (e) => {
  const deleteBtn = e.target.closest(".delete-btn");
  const editBtn = e.target.closest(".edit-btn");
  const saveBtn = e.target.closest(".save-btn");

  // DELETE
  if (deleteBtn) {
    const id = Number(deleteBtn.dataset.id);

    const index = products.findIndex(p => p.id === id);
    products.splice(index, 1);

    applyFilter();
  }

  // EDIT
  if (editBtn) {
    editingId = Number(editBtn.dataset.id);
    renderProducts();
  }

  // SAVE
  if (saveBtn) {
    const id = Number(saveBtn.dataset.id);
    const input = list.querySelector(".edit-input");

    const product = products.find(p => p.id === id);
    product.name = input.value;

    editingId = null;
    applyFilter();
  }
});


// INIT
render();