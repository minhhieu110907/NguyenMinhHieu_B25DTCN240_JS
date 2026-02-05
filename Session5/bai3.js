let booksId = [], booksName = [], inventoryQuantity = [];
let bookType, bookCode, bookName, currentStockQuantity;
let output = "";
do {
    bookType = +prompt("Có bao nhiêu loại sách cần kiểm tra bổ sung hôm nay?");
    if ( bookType < 0 || Number.isInteger(bookType) ) {
        alert("Số loại sách phải là số nguyên dương. Vui lòng nhập lại");
    }
} while ( bookType < 0 || Number.isInteger(bookType) );

for ( let i = 1; i <= bookType; i++) {
    do {
        bookCode = prompt(`Nhập vào mã sách ${i}`);
        if ( !bookCode || !bookCode.trim() ) {
            alert("Mã sách không được để trống");
        }
    } while( !bookCode || !bookCode.trim() );

    do {
        bookName = prompt(`Nhập vào tên sách ${i}`);
        if ( !bookName || !bookName.trim() ) {
            alert("Tên sách không được để trống");
        }
    } while( !bookName || !bookName.trim() );

    do {
        currentStockQuantity = +prompt("Nhập vào số lượng tồn kho hiện tại");
        if ( !currentStockQuantity || !currentStockQuantity.trim() || currentStockQuantity < 0 ) {
            alert("Mã sách phải là số nguyên dương");
        }
    } while( !bookCode || !bookCode.trim() );

    booksId.push(bookCode);
    booksName.push(bookName);
    inventoryQuantity.push(currentStockQuantity);
}

