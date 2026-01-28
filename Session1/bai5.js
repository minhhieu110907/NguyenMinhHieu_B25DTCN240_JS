let bookName = prompt("Mời bạn nhập vào tên sách: ");
let publishedYear = prompt("Mời bạn nhập vào năm xuất bản của sách: ");

let cleanBookName = bookName.trim();
const currentYear = 2026;

console.log("-----Thông tin sách-----");
console.log(`Tên sách: ${cleanBookName}`);
console.log(`Năm xuất bản: ${+publishedYear}`);
console.log(`Tuổi của sách: ${currentYear - +publishedYear}`);
