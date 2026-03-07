const products = [
{ id: 1, name: "Bánh Chưng", price: 150000 },
{ id: 2, name: "Giò Lụa", price: 180000 },
{ id: 3, name: "Cành Đào", price: 500000 },
{ id: 4, name: "Mứt Tết", price: 120000 },
{ id: 5, name: "Bao Lì Xì", price: 25000 },
{ id: 6, name: "Dưa Hấu Tết", price: 80000 },
];

const productList = document.querySelector("#product-list");

function renderProducts(){
productList.innerHTML = "";
products.forEach(product => {
const li = document.createElement("li");
li.classList.add("product-item");
li.innerHTML = `
${product.name} - ${product.price} VND
<button class="delete-btn">Xóa</button>
`;
const deleteBtn = li.querySelector(".delete-btn");
deleteBtn.addEventListener("click", function(){
const confirmDelete = confirm("Bạn có chắc muốn xóa sản phẩm này?");
if(confirmDelete){
li.remove();
}
});
productList.appendChild(li);
});
}

renderProducts();