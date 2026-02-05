let books = [];
let numberOfBook, bookName; 
let output = "";
do {
    numberOfBook = +prompt("Nhập vào số cuốn sách: ");
    if( numberOfBook < 0 || !Number.isInteger(numberOfBook) ){
        alert("Số cuốn sách không phù hợp. Vui lòng nhập lại");
    }
} while ( numberOfBook < 0 || !Number.isInteger(numberOfBook) );


for (let i = 1; i <= numberOfBook; i++) {
    bookName = prompt(`Nhập tên cuốn sách thứ ${i}`);
    books.push(bookName);
}

for (let i = 0; i < books.length; i++) {
    output+=`${i + 1}. ${books[i]}\n`;
}

alert(`Tổng số sách đã được trả: ${numberOfBook}
${output}`);