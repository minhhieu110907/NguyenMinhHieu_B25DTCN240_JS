let products = [
    { id: 1, name: "Bánh Chưng", price: 150000 },
    { id: 2, name: "Giò Lụa", price: 180000 },
    { id: 3, name: "Cành Đào", price: 500000 },
    { id: 4, name: "Mứt Tết", price: 120000 },
    { id: 5, name: "Bao Lì Xì", price: 25000 },
    { id: 6, name: "Dưa Hấu Tết", price: 80000 },
];

const productList = document.getElementById('product-list');
const productForm = document.getElementById('product-form');
const productNameInput = document.getElementById('product-name');
const productPriceInput = document.getElementById('product-price');

function renderProducts() {
    productList.innerHTML = '';
    products.forEach(product => {
        const li = document.createElement('li');
        li.className = 'product-item';
        li.innerHTML = `
            <strong>${product.name}</strong> 
            <span>- ${product.price.toLocaleString()} VND</span>
            <button class="edit-price-btn" onclick="editPrice(${product.id})">Sửa giá</button>
            <button class="delete-btn" onclick="deleteProduct(${product.id})">Xóa</button>
        `;
        productList.appendChild(li);
    });
}

function editPrice(id) {
    const newPrice = prompt("Nhập giá mới (VND):");
    
    if (newPrice !== null && newPrice.trim() !== "" && !isNaN(newPrice)) {
        products = products.map(p => {
            if (p.id === id) {
                return { ...p, price: Number(newPrice) };
            }
            return p;
        });
        renderProducts();
    } else if (newPrice !== null) {
        alert("Vui lòng nhập một số tiền hợp lệ!");
    }
}

function deleteProduct(id) {
    if (confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
        products = products.filter(p => p.id !== id);
        renderProducts();
    }
}

productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameValue = productNameInput.value;
    const priceValue = productPriceInput.value;
    
    if (!nameValue || !priceValue) return;

    const newProduct = {
        id: Date.now(),
        name: nameValue,
        price: Number(priceValue)
    };

    products.push(newProduct);
    renderProducts();
    productForm.reset();
    productNameInput.focus();
});

renderProducts();