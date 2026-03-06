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

function renderProducts() {
    productList.innerHTML = '';
    products.forEach(product => {
        const li = document.createElement('li');
        li.className = 'product-item';
        li.innerHTML = `
            <strong>${product.name}</strong> 
            <span>- ${product.price.toLocaleString()} VNĐ</span>
            <button class="delete-btn" onclick="deleteProduct(${product.id})">Xóa</button>
        `;
        productList.appendChild(li);
    });
}

function deleteProduct(id) {
    if (confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
        products = products.filter(p => p.id !== id);
        renderProducts();
    }
}

productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('product-name').value;
    const price = document.getElementById('product-price').value;
    
    if (!name || !price) return;

    const newProduct = {
        id: Date.now(),
        name: name,
        price: Number(price)
    };

    products.push(newProduct);
    renderProducts();
    productForm.reset();
});

renderProducts();