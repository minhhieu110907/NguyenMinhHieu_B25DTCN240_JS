// --- 1. KHỞI TẠO BIẾN TOÀN CỤC & TRUY VẤN DOM ---
let products = JSON.parse(localStorage.getItem("products")) || [];
let lastId = parseInt(localStorage.getItem("lastId")) || 0;
let isEditMode = false;
let editId = null;

const productForm = document.getElementById("productForm");
const tableContainer = document.getElementById("table-container");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");
const formTitle = document.getElementById("formTitle");

// Các input fields
const nameInput = document.getElementById("productName");
const categoryInput = document.getElementById("productCategory");
const priceInput = document.getElementById("productPrice");
const quantityInput = document.getElementById("productQuantity");
const descInput = document.getElementById("productDescription");

// Tìm kiếm & Lọc
const searchInput = document.getElementById("searchInput");
const filterCategory = document.getElementById("filterCategory");

// --- 2. HÀM HIỂN THỊ (RENDER) ---
function renderTable(data = products) {
  if (data.length === 0) {
    tableContainer.innerHTML = `
      <div class="empty-state show">
        <div class="empty-state-icon">📦</div>
        <p class="empty-state-text">Không tìm thấy sản phẩm nào!</p>
      </div>`;
  } else {
    let html = `
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên sản phẩm</th>
            <th>Danh mục</th>
            <th>Giá (VNĐ)</th>
            <th>Số lượng</th>
            <th>Mô tả</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>`;

    data.forEach((p) => {
      // Chức năng 2: Format tiền & Highlight số lượng < 10
      const formattedPrice = new Intl.NumberFormat("vi-VN").format(p.price) + " ₫";
      const quantityClass = p.quantity < 10 ? "low-stock" : "";
      
      html += `
        <tr>
          <td>#${p.id}</td>
          <td><strong>${p.name}</strong></td>
          <td>${p.category}</td>
          <td class="price">${formattedPrice}</td>
          <td class="quantity ${quantityClass}">${p.quantity}</td>
          <td class="description" title="${p.description}">${p.description || "---"}</td>
          <td>
            <div class="action-buttons">
              <button class="btn-edit" onclick="editProduct(${p.id})">Sửa</button>
              <button class="btn-delete" onclick="deleteProduct(${p.id})">Xóa</button>
            </div>
          </td>
        </tr>`;
    });

    html += `</tbody></table>`;
    tableContainer.innerHTML = html;
  }
  updateStats();
}

// --- 3. CHỨC NĂNG THÊM & CẬP NHẬT ---
productForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const product = {
    name: nameInput.value.trim(),
    category: categoryInput.value,
    price: parseFloat(priceInput.value),
    quantity: parseInt(quantityInput.value),
    description: descInput.value.trim(),
  };

  // Chức năng 1: Validation
  if (product.price < 0 || product.quantity < 0) {
    alert("Giá và số lượng không được âm!");
    return;
  }

  if (isEditMode) {
    // Chức năng 3: Cập nhật
    const index = products.findIndex((p) => p.id === editId);
    products[index] = { ...products[index], ...product };
    resetForm();
  } else {
    // Chức năng 1: Thêm mới
    lastId++;
    product.id = lastId;
    products.push(product);
  }

  saveData();
  renderTable();
  productForm.reset();
});

// --- 4. CHỨC NĂNG SỬA ---
window.editProduct = (id) => {
  const p = products.find((item) => item.id === id);
  if (!p) return;

  isEditMode = true;
  editId = id;

  // Điền dữ liệu vào form
  nameInput.value = p.name;
  categoryInput.value = p.category;
  priceInput.value = p.price;
  quantityInput.value = p.quantity;
  descInput.value = p.description;

  // Thay đổi giao diện nút
  formTitle.innerText = "Chỉnh Sửa Sản Phẩm";
  submitBtn.innerText = "💾 Cập Nhật";
  cancelBtn.style.display = "inline-block";

  // Scroll lên form
  window.scrollTo({ top: 0, behavior: "smooth" });
};

function resetForm() {
  isEditMode = false;
  editId = null;
  formTitle.innerText = "Thêm Sản Phẩm Mới";
  submitBtn.innerText = "➕ Thêm Sản Phẩm";
  cancelBtn.style.display = "none";
  productForm.reset();
}

cancelBtn.onclick = resetForm;

// --- 5. CHỨC NĂNG XÓA ---
window.deleteProduct = (id) => {
  const p = products.find((item) => item.id === id);
  if (confirm(`Bạn có chắc chắn muốn xóa sản phẩm: ${p.name}?`)) {
    products = products.filter((item) => item.id !== id);
    if (editId === id) resetForm();
    saveData();
    renderTable();
  }
};

// Chức năng 5: Xóa tất cả
document.getElementById("clearAllBtn").onclick = () => {
  if (confirm("⚠️ CẢNH BÁO: Hành động này sẽ xóa toàn bộ dữ liệu! Bạn có chắc không?")) {
    products = [];
    lastId = 0;
    saveData();
    renderTable();
    resetForm();
  }
};

// --- 6. TÌM KIẾM & LỌC (KẾT HỢP) ---
function handleSearchFilter() {
  const keyword = searchInput.value.toLowerCase();
  const category = filterCategory.value;

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(keyword) || 
                        p.description.toLowerCase().includes(keyword);
    const matchCate = category === "" || p.category === category;
    return matchSearch && matchCate;
  });

  renderTable(filtered);
}

searchInput.oninput = handleSearchFilter;
filterCategory.onchange = handleSearchFilter;

// --- 7. LƯU TRỮ LOCALSTORAGE ---
function saveData() {
  localStorage.setItem("products", JSON.stringify(products));
  localStorage.setItem("lastId", lastId);
}

// --- 8. THỐNG KÊ ĐỘNG ---
function updateStats() {
  const totalProducts = products.length;
  const totalQty = products.reduce((sum, p) => sum + p.quantity, 0);
  const totalVal = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);

  document.getElementById("totalProducts").innerText = totalProducts;
  document.getElementById("totalQuantity").innerText = totalQty;
  document.getElementById("totalValue").innerText = new Intl.NumberFormat("vi-VN").format(totalVal) + " ₫";
}

// KHỞI CHẠY LẦN ĐẦU
renderTable();