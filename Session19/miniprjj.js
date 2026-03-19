const products = [
  {
    id: 1,
    name: "Tai nghe Bluetooth TWS",
    price: 320000,
    image: "https://picsum.photos/seed/mp19-tws/1200/800",
    description: "Chống ồn nhẹ, pin 20h, kết nối ổn định.",
  },
  {
    id: 2,
    name: "Bàn phím cơ 87 phím",
    price: 790000,
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=1200&q=60",
    description: "Switch blue, led trắng, gõ sướng tay.",
  },
  {
    id: 3,
    name: "Chuột không dây công thái học",
    price: 450000,
    image:
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1200&q=60",
    description: "Thiết kế ergonomic, sạc USB-C.",
  },
  {
    id: 4,
    name: "USB 64GB",
    price: 120000,
    image: "https://picsum.photos/seed/mp19-usb/1200/800",
    description: "Nhỏ gọn, tốc độ đọc/ghi ổn định.",
  },
  {
    id: 5,
    name: "Đế tản nhiệt laptop",
    price: 210000,
    image:
      "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&w=1200&q=60",
    description: "2 quạt gió, đỡ mỏi cổ tay.",
  },
  {
    id: 6,
    name: "Cáp sạc Type-C 1m",
    price: 80000,
    image: "https://picsum.photos/seed/mp19-cable/1200/800",
    description: "Bọc dù, hỗ trợ sạc nhanh.",
  },
];

let cart = [];

const statLines = document.querySelector("#stat-lines");
const statQuantity = document.querySelector("#stat-qty");
const statTotal = document.querySelector("#stat-total");
const quantityCart = document.querySelector("#cart-qty-badge");
const lineCart = document.querySelector("#cart-lines-badge");

const clearCartBtn = document.querySelector("#clear-cart-btn");
const addBtn = document.querySelector(".btn-add");

const cartList = document.querySelector("#cart-tbody");
const productList = document.querySelector("#products-grid");
const productsEmptyMs = document.querySelector("#products-empty");

function formatPrice(num) {
  return num.toLocaleString("vi-VN") + " VNĐ";
}

// RENDER PRODUCTLIST
function renderProducts() {
  productList.innerHTML = "";
  products.forEach((p) => {
    let creatDiv = document.createElement("div");

    creatDiv.innerHTML = `
  <div class="card">
    <div class="card-img">
      <img src="${p.image}" />
    </div>

    <div class="card-body">
      <h3 class="card-title">${p.name}</h3>
      <p class="card-desc">${p.description}</p>

      <div class="card-footer">
        <span class="price">${formatPrice(p.price)}</span>
        <button class="btn btn-primary btn-add" data-id="${p.id}">
          Thêm vào giỏ
        </button>
      </div>
    </div>
  </div>`;

    productList.appendChild(creatDiv);
  });
}

// RENDER SHOPPINGCART
function renderCart(list = cart) {
  cartList.innerHTML = "";
  if (list.length === 0) {
    cartList.innerHTML = `
    <tr>
      <td colspan="5" class="empty">
        <div class="empty-title">Giỏ hàng đang trống</div>
        <div class="empty-subtitle">
          Hãy bấm <strong>Thêm vào giỏ</strong> ở sản phẩm bên trái.
        </div>
      </td>
    </tr>
  `;
  } else {
    cartList.innerHTML = `
              <tr>
                <th>Tên</th>
                <th class="right">Giá</th>
                <th class="center">SL</th>
                <th class="right">Thành tiền</th>
                <th class="center">Hành động</th>
              </tr>`;

    list.forEach((p) => {
      cartList.innerHTML += `
               <tr>
                <td>${p.name}</td>
                <td>${formatPrice(p.price)}</td>
                <td> <button data-id="${p.productId}" data-action="decrease">-</button>
                     <span>${p.quantity}</span>
                     <button data-id="${p.productId}" data-action="increase">+</button>
                </td>
                <td> ${formatPrice(p.price * p.quantity)} </td>
                <td><button data-id="${p.productId}" data-action="remove" >Xoá</button></td>
               </tr>`;
    });
  }
}

// HANDLE INCREASE / DECREASE
cartList.addEventListener("click", function (e) {
  const id = Number(e.target.dataset.id);
  const action = e.target.dataset.action;

  if (!action) return;

  if (action === "increase") updateQuantity(id, 1);
  else if (action === "decrease") updateQuantity(id, -1);
  else if (action === "remove") removeItem(id);
  saveData();
  renderCart();
  updateStatics();
});

// UPDATE QUANTITY
function updateQuantity(id, delta) {
  let item = cart.find((p) => p.productId === id);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeItem(id);
  }
}

// DELETE CART
function removeItem(id) {
  let index = cart.findIndex((p) => p.productId === id);
  if (index === -1) return;
  if (confirm(`Bạn có chắc chắn muốn xoá sản phẩm ${cart[index].name} ?`)) {
    cart.splice(index, 1);
  }
  saveData();
  renderCart();
  updateStatics();
}

// DELETE  ALL SHOPPINGCART
clearCartBtn.addEventListener("click", function (e) {
  let clearAllBtn = e.target.closest("#clear-cart-btn");
  if (!clearAllBtn) return;

  if (
    confirm(
      "⚠️ CẢNH BÁO: Hành động này khiến tất cả dữ liệu trong giỏ hàng bị xoá. \n\n Bạn có chắc chắn muốn xóa toàn bộ sản phẩm?",
    )
  ) {
    cart = [];
    saveData();
    renderCart();
    updateStatics();
  }
});

// UPDATE STATICS
function updateStatics() {
  statLines.textContent = cart.length;
  statQuantity.textContent = cart.reduce((sum, c) => sum + c.quantity, 0);
  statTotal.textContent =
    cart
      .reduce((sum, c) => sum + c.price * c.quantity, 0)
      .toLocaleString("vi-VN") + " VNĐ";

  lineCart.textContent = cart.length;
  quantityCart.textContent = cart.reduce((sum, c) => sum + c.quantity, 0);
}

// ADD TO CART
productList.addEventListener("click", function (e) {
  let btn = e.target.closest(".btn-add");
  if (!btn) return;
  let id = Number(btn.dataset.id);
  addToCart(id);
});

function addToCart(id) {
  let product = cart.find((p) => p.productId === id);
  if (product) {
    product.quantity += 1;
  } else {
    let item = products.find((p) => p.id === id);
    if (!item) return;
    cart.push({
      productId: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
    });
  }
  saveData();
  renderCart();
  updateStatics();
}

// SAVE CART
function saveData() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart() {
  try {
    let data = JSON.parse(localStorage.getItem("cart"));
    if (Array.isArray(data)) cart = data;
  } catch {
    cart = [];
  }
}

loadCart();
renderProducts();
renderCart();

