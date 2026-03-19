let products = JSON.parse(localStorage.getItem("products")) || [];
let idCounter = JSON.parse(localStorage.getItem("idCounter")) || 1;
let editingId = null;

//2. GET DOM //
const nameInput = document.querySelector("#productName");
const categoryInput = document.querySelector("#productCategory");
const priceInput = document.querySelector("#productPrice");
const quantityInput = document.querySelector("#productQuantity");
const descriptionInput = document.querySelector("#productDescription");

const formTitle = document.querySelector("#formTitle");
const form = document.querySelector("#productForm");
const tableContainer = document.querySelector("#table-container");

const searchInput = document.querySelector("#searchInput");
const filterCategory = document.querySelector("#filterCategory");

const totalProducts = document.querySelector("#totalProducts");
const totalValue = document.querySelector("#totalValue");
const totalQuantity = document.querySelector("#totalQuantity");

const cancelBtn = document.querySelector("#cancelBtn");
const clearAllBtn = document.querySelector("#clearAllBtn");
const submitBtn = document.querySelector("#submitBtn");

//4.SAVE LOCAL STORAGE//
function saveData() {
  localStorage.setItem("products", JSON.stringify(products));
  localStorage.setItem("idCounter", JSON.stringify(idCounter));
}

//5. VALIDATE FORM//
function validateForm() {
  if (!nameInput.value.trim()) {
    alert("Tên sản phẩm không được rỗng");
    return false;
  }

  if (!categoryInput.value) {
    alert("Phải chọn danh mục");
    return false;
  }

  if (priceInput.value < 0) {
    alert("Giá phải >= 1000");
    return false;
  }

  if (quantityInput.value < 0) {
    alert("Số lượng phải >= 0");
    return false;
  }

  return true;
}

//6. RESET FORM//
function resetForm() {
  form.reset();
  editingId = null;
  formTitle.textContent = "Thêm Sản Phẩm Mới";
  submitBtn.textContent = "➕ Thêm Sản Phẩm";

  cancelBtn.style.display = "none";
}

//7. RENDER TABLE//
function renderProducts(list = products) {
  if (list.length === 0) {
    tableContainer.innerHTML = `
<div class="empty-state show">
<div class="empty-state-icon">📦</div>
<div class="empty-state-text">Chưa có sản phẩm</div>
</div>
`;
    return;
  }

  let html = `
<table>
<thead>
<tr>
<th>ID</th>
<th>Tên</th>
<th>Danh mục</th>
<th>Giá</th>
<th>Số lượng</th>
<th>Mô tả</th>
<th>Hành động</th>
</tr>
</thead>
<tbody>
`;

  list.forEach((p) => {
    html += `
<tr>
<td>${p.id}</td>
<td>${p.name}</td>
<td>${p.category}</td>
<td class="price">
${p.price.toLocaleString("vi-VN")} ₫
</td>
<td class="quantity ${p.quantity < 10 ? "low-stock" : ""}">
${p.quantity}
</td>
<td class="description">
${p.description || ""}
</td>
<td class="action-buttons">
<button class="btn-edit" data-id="${p.id}">
Sửa
</button>
<button class="btn-delete" data-id="${p.id}">
Xóa
</button>
</td>
</tr>
`;
  });

  html += "</tbody></table>";
  tableContainer.innerHTML = html;
}

// 8. UPDATE STATICS//

function updateStats() {
  // TOTAL PRODUCTS
  totalProducts.textContent = products.length;

  // TOTAL QUANTITY
  let totalQty = products.reduce((sum, p) => sum + p.quantity, 0);
  totalQuantity.textContent = totalQty;
  // TOTAL VALUE
  let totalVal = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
  totalValue.textContent = totalVal.toLocaleString("vi-VN") + " ₫";
}

//9. THÊM HOẶC CẬP NHẬT SẢN PHẨM //
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  let productData = {
    name: nameInput.value.trim(),
    category: categoryInput.value.trim(),
    price: +priceInput.value,
    quantity: +quantityInput.value,
    description: descriptionInput.value.trim(),
  };

  // UPDATE
  if (editingId) {
    let product = products.find((p) => p.id === editingId);
    Object.assign(product, productData);
    saveData();
    renderProducts();
    updateStats();
    resetForm();
  } else {
    // ADD
    productData.id = idCounter++;
    products.push(productData);
    saveData();
    renderProducts();
    updateStats();
    resetForm();
  }
});

// 10. CLICK EDIT / DELETE //
tableContainer.addEventListener("click", function (e) {
  let id = Number(e.target.dataset.id);
  if (e.target.classList.contains("btn-delete")) {
    let product = products.find((p) => p.id === id);

    if (confirm("Bạn có chắc chắn muốn xoá sản phầm " + product.name + "?")) {
      products = products.filter((p) => p.id !== id);
      saveData();
      renderProducts();
      updateStats();
    }
  }
  if (e.target.classList.contains("btn-edit")) {
    let product = products.find((p) => p.id === id);
    editingId = id;

    // FILL FORM
    nameInput.value = product.name;
    priceInput.value = product.price;
    categoryInput.value = product.category;
    quantityInput.value = product.quantity;
    descriptionInput.value = product.description;

    // CHANGE UI
    formTitle.textContent = "Chỉnh Sửa Sản Phẩm";
    submitBtn.textContent = "💾 Cập Nhật";
    cancelBtn.style.display = "inline-block";

    // SCROLL FORM
    window.scrollTo({ top: 0, behavior: "smooth" });
    nameInput.focus();
  }
});

//11. CANCEL EDIT//
cancelBtn.addEventListener("click", resetForm);

//12.DELETE ALL//
clearAllBtn.addEventListener("click", function () {
  if (!confirm("⚠️ Xóa toàn bộ sản phẩm?")) return;
  products = [];
  idCounter = 1;
  localStorage.removeItem("products");
  localStorage.removeItem("idCounter");
  saveData();
  renderProducts();
  updateStats();
  resetForm();
});

//13. SEARCH + FILTER//

function applySearchFilter() {
  let keyword = searchInput.value.toLowerCase();
  let filtered = products;
  let category = filterCategory.value;

  if (category) {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (keyword) {
    filtered = filtered.filter((p) => {
      return (
        p.name.toLowerCase().includes(keyword) ||
        p.description.toLowerCase().includes(keyword)
      );
    });
  }

  renderProducts(filtered);
}

// realtime search
searchInput.addEventListener("input", applySearchFilter);

// filter category
filterCategory.addEventListener("change", applySearchFilter);

//14. APP START//


renderProducts();
updateStats();