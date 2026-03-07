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
const searchInput = document.getElementById('search-input');
const btnSortAsc = document.getElementById('sort-asc');
const btnSortDesc = document.getElementById('sort-desc');

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

// Chức năng Sắp xếp giá Tăng dần
btnSortAsc.addEventListener('click', () => {
    products.sort((a, b) => a.price - b.price);
    renderProducts();
});

// Chức năng Sắp xếp giá Giảm dần
btnSortDesc.addEventListener('click', () => {
    products.sort((a, b) => b.price - a.price);
    renderProducts();
});

// Chức năng Tìm kiếm
searchInput.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase();
    const items = document.querySelectorAll('.product-item');
    items.forEach(item => {
        const productName = item.querySelector('strong').innerText.toLowerCase();
        item.style.display = productName.includes(value) ? '' : 'none';
    });
});

function editPrice(id) {
    const newPrice = prompt("Nhập giá mới (VND):");
    if (newPrice !== null && !isNaN(newPrice) && newPrice.trim() !== "") {
        products = products.map(p => p.id === id ? { ...p, price: Number(newPrice) } : p);
        renderProducts();
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
    const name = document.getElementById('product-name').value;
    const price = document.getElementById('product-price').value;
    if (!name || !price) return;
    products.push({ id: Date.now(), name, price: Number(price) });
    renderProducts();
    productForm.reset();
});

renderProducts();