const products = [
    { id: 1, name: "Bánh Chưng", price: 150000, img: "./img/banhchung.webp" },
    { id: 2, name: "Giò Lụa", price: 180000, img: "./img/giolua.jpg" },
    { id: 3, name: "Cành Đào", price: 500000, img: "./img/canhdao.webp" },
    { id: 4, name: "Mứt Tết", price: 120000, img: "./img/muttet.webp" },
    { id: 5, name: "Lì Xì (Tệp)", price: 20000, img: "./img/lixi.webp" },
    { id: 6, name: "Dưa Hấu", price: 60000, img: "./img/duahau.jpg" }
];

const cart = [];

function renderProducts() {
    const productsList = document.getElementById("product-list");
    let html = "";
    products.forEach((product) => {
        html += `
            <div class="product-card">
                <img src="${product.img}">
                <h3>${product.name}</h3>
                <p class="price">${product.price.toLocaleString("vi-VN")}đ</p>
                <button class="btn-add" onclick="addToCart(${product.id})">
                    Thêm vào giỏ
                </button>
            </div>
        `;
    });

    productsList.innerHTML = html;
}

function addToCart(id) {
    const product = products.find(item => item.id === id);
    if (product) {
        cart.push(product);
        renderCart();
    }
}


function renderCart() {
    const cartList = document.getElementById("cart-list");
    if (cart.length === 0) {
        cartList.innerHTML = `
            <li class="empty-msg">Chưa có món nào...</li>
        `;
    } else {
        let html = "";
        cart.forEach(item => {
            html += `
                <li>
                    <span class="cart-item-name">${item.name}</span>
                    <div>
                        <span class="cart-item-price">
                            ${item.price.toLocaleString("vi-VN")}đ
                        </span>
                    </div>
                </li>
            `;
        });
        cartList.innerHTML = html;
    }
    updateTotal();
}

function updateTotal() {
    const totalElement = document.getElementById("total-price");
    const total = cart.reduce((sum, item) => {
        return sum + item.price;
    }, 0);
    totalElement.innerText = total.toLocaleString("vi-VN") + "đ";
}

renderProducts();
renderCart();