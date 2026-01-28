let rawBookName = prompt("Nhập tên sách:");
let rawAuthor = prompt("Nhập tên tác giả:");
let publishYear = prompt("Nhập năm xuất bản:");
let price = prompt("Nhập giá tiền mỗi cuốn:");
let quantity = prompt("Nhập số lượng nhập kho:");


let bookName = rawBookName.trim().toUpperCase();
let author = rawAuthor.toUpperCase();
let authorPrefix = author.substring(0, 3);
let randomId = Math.floor(Math.random() * 1000) + 1;
let bookId = `${authorPrefix}${publishYear}-${randomId}`;


const CURRENT_YEAR = 2026;
let bookAge = CURRENT_YEAR - Number(publishYear);
let totalValue = Number(price) * Number(quantity);
let shelfNumber = Math.floor(Math.random() * 10) + 1;

console.log(`
--- PHIẾU NHẬP KHO ---
Mã sách: ${bookId}
Tên sách: ${bookName}
Tác giả: ${author}
Năm xuất bản: ${publishYear}
Tuổi sách: ${bookAge} năm
Tổng giá trị: ${totalValue.toLocaleString()} VNĐ
Ngăn kệ gợi ý: Kệ số ${shelfNumber}
----------------------
`);