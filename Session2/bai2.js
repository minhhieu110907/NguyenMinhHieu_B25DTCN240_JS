let bookCount = prompt("Nhập số lượng sách: ");

if ( bookCount < 10 && bookCount > 0){
    console.log("Thư viện có ít sách");
} else if ( bookCount >= 10 && bookCount <= 20 ){
    console.log("Thư viện có lượng sách vừa đủ");
} else if ( bookCount > 20) {
    console.log("Thư viện có nhiều sách");
}