const students = [
  { id: 1, name: "Nguyễn Văn Anh", age: 20, gpa: 8.5, status: "active" },
  { id: 2, name: "Trần Thị Bình", age: 21, gpa: 7.2, status: "active" },
  { id: 3, name: "Lê Hoàng Châu", age: 19, gpa: 9.8, status: "active" },
  { id: 4, name: "Phạm Minh Đức", age: 22, gpa: 6.5, status: "active" },
  { id: 5, name: "Nguyễn Minh Hiếu", age: 18, gpa: 10.0, status: "active" },
];


let topGpa = students.slice().sort((a,b)=>b.gpa-a.gpa).slice(0,5);
  let youngest = students.slice().sort((a,b)=>a.age-b.age).slice(0,5);

  console.log("Top 5 GPA cao nhất:");
  console.table(topGpa);

  console.log("Top 5 nhỏ tuổi nhất:");
  console.table(youngest);



  // =======================
// 1. DATA
// =======================

const products = [
    { id: 1, name: "Bánh Chưng", price: 150000, img: "./img/banhchung.webp" },
    { id: 2, name: "Giò Lụa", price: 180000, img: "./img/giolua.jpg" },
    { id: 3, name: "Cành Đào", price: 500000, img: "./img/canhdao.webp" },
    { id: 4, name: "Mứt Tết", price: 120000, img: "./img/muttet.webp" },
    { id: 5, name: "Lì Xì (Tệp)", price: 20000, img: "./img/lixi.webp" },
    { id: 6, name: "Dưa Hấu", price: 60000, img: "./img/duahau.jpg" }
];

let cart = [];


// =======================
// 2. DOM ELEMENTS
// =======================

const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const totalElement = document.getElementById("total-price");


// =======================
// 3. RENDER PRODUCTS
// =======================

function renderProducts() {
    productList.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.img}">
            <h3>${product.name}</h3>
            <p class="price">${product.price.toLocaleString("vi-VN")}đ</p>
            <button class="btn-add" data-id="${product.id}">
                Thêm vào giỏ
            </button>
        </div>
    `).join("");
}


// =======================
// 4. RENDER CART
// =======================

function renderCart() {

    if (cart.length === 0) {
        cartList.innerHTML = `
            <li class="empty-msg">Chưa có món nào...</li>
        `;
    } else {

        cartList.innerHTML = cart.map(item => `
            <li>
                <span class="cart-item-name">${item.name}</span>
                <div>
                    <span class="cart-item-price">
                        ${item.price.toLocaleString("vi-VN")}đ
                    </span>
                </div>
            </li>
        `).join("");
    }

    updateTotal();
}


// =======================
// 5. UPDATE TOTAL
// =======================

function updateTotal() {

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    totalElement.innerText = total.toLocaleString("vi-VN") + "đ";
}


// =======================
// 6. EVENT DELEGATION
// =======================

productList.addEventListener("click", function (e) {

    if (e.target.classList.contains("btn-add")) {

        const id = Number(e.target.dataset.id);
        const product = products.find(item => item.id === id);

        if (product) {
            cart.push(product);
            renderCart();
        }
    }
});


// =======================
// 7. INIT
// =======================

renderProducts();
renderCart();