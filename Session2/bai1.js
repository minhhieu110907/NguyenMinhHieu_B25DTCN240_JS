let bookName = prompt("Mời bạn nhập vào tên sách: ");
let authorName = prompt("Mời bạn nhập vào tên tác giả: ");
let publishedYear = +prompt("Mời bạn nhập vào năm xuất bản: ");
const currentYear = 2026;
let bookAge = currentYear - publishedYear;

if( bookAge === 0 ){
    console.log("Đây là sách mới");
} else if ( bookAge <= 5 && bookAge > 0) {
    console.log("Sách khá mới");
} else {
    console.log("Sách đã cũ");
}


