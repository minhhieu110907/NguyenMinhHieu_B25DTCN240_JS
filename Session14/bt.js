const products = [
  { id: 1, name: "Bánh Chưng", price: 150000, img: "./img/banhchung.webp" },
  { id: 2, name: "Giò Lụa", price: 180000, img: "./img/giolua.jpg" },
  { id: 3, name: "Cành Đào", price: 500000, img: "./img/canhdao.webp" },
  { id: 4, name: "Mứt Tết", price: 120000, img: "./img/muttet.webp" },
  { id: 5, name: "Lì Xì (Tệp)", price: 20000, img: "./img/lixi.webp" },
  { id: 6, name: "Dưa Hấu", price: 60000, img: "./img/duahau.jpg" },
];

let cart = [];

const productsList = document.querySelector("#product-list");
const cartList = document.querySelector("#cart-list");
const totalElement = document.querySelector("#total-price");

function renderProducts() {
    productsList.innerHTML = products.map(product => `
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
                    <button class="btn-remove" data-id="${item.id}">Xoá</button>
                </div>
            </li>
        `).join("");
    }

    updateTotal();
}


function updateTotal (){
    const totalPrice = cart.reduce((total ,p) => total + p.price,0);
    totalElement.innerHTML = totalPrice.toLocaleString("vi-VN") + "đ";
}

productsList.addEventListener("click", function(e){
  e.preventDefault();
  if(e.target.classList.contains("btn-add")) {
    const id = +(e.target.dataset.id);
    let product = products.find(p => p.id === id);
    if(product)
      cart.push(product);
      renderCart();
  }
});


cartList.addEventListener("click", (e) => {
  e.preventDefault();
  if(e.target.classList.contains("btn-remove")){
    const id = +(e.target.dataset.id);
    cart = cart.filter(p => p.id !== id);
    renderCart();
  }
});


renderProducts();
renderCart();
