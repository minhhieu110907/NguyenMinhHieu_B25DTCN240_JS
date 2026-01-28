let bookName = prompt("Mời bạn nhập vào tên sách: ");
let bookOrder = prompt("Mời bạn nhập vào số thứ tự sách: ");

let cleanBookName = bookName.trim();
let upperName= cleanBookName.toUpperCase();

console.log(`Tên sách: ${cleanBookName}`);
console.log(`Mã sách sau khi chuẩn hoá: LIB-${upperName}-${bookOrder}`);
