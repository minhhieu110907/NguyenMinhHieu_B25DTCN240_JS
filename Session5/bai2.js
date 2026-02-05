let book = [];
let numberOfBook, bookName;
let output = "";

do {
    numberOfBook = +prompt("Nhập vào số sách được trả");
    if( Number.isInteger(numberOfBook) || numberOfBook < 0 ) {
        alert("Số lượng sách không hợp lệ. Vui lòng nhập lại");
    }
} while ( Number.isInteger(numberOfBook) || numberOfBook < 0 );

for ( let i = 0; i < numberOfBook; i++){
    do {
        bookName = prompt(`Nhập vào tên sách thứ ${i}`);
        if ( !bookName || !isNaN(bookName) ) {
            alert("Tên sách không hợp lệ. Vui lòng nhập lại");
        }
    } while ( !bookName || !isNaN(bookName) );
    book.push(bookName);
}

for ( let i = 0; i <  numberOfBook; i++) {
    output += `${i}. ${book[i]}\n`;
}


alert(`Số sách được mượn: ${numberOfBook}
${output}`);