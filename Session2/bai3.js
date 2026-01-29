let bookName = prompt("Nhập tên sách:");
let bookCategory = prompt("Nhập thể loại sách (Khoa học, Lịch sử, Văn học, Truyện):");
let bookStatus = prompt("Nhập tình trạng sách (có sẵn / đã mượn):");

if (bookCategory === "Khoa học" || bookCategory === "Lịch sử") {
    if (bookStatus === "có sẵn") {
        console.log("Sách này có sẵn trong thư viện");
    } else {
        console.log("Sách đã được mượn");
    }
} else if (bookCategory === "Văn học" || bookCategory === "Truyện") {
    console.log("Sách này có thể đọc giải trí");
} else {
    console.log("Thể loại sách không hợp lệ");
}
