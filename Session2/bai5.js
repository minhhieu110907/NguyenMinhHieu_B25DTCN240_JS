let bookName = prompt("Nhập tên sách: ");
let bookStatus = prompt("Nhập trạng thái sách(có sẵn/ đã mượn: ");
let publishedYear = +prompt("Nhập năm xuất bản: ");
const currentYear = 2026;
let bookAge = currentYear - publishedYear;

if (bookStatus === "có sẵn" && bookAge <= 5 && bookAge > 0) {
  alert("Sách này mới và có sẵn để mượn");
} else if (bookStatus === "đã mượn" && bookAge <= 10 && bookAge >= 5) {
  alert("Sách này đã mượn nhưng khá mới, có thể mượn lại sau");
} else if (bookStatus === "đã mượn" && bookAge > 10) {
  alert("Sách này đã mượn và khá cũ");
} else if (bookStatus === "có sẵn" && bookAge > 5) {
  alert("Sách này có sẵn nhưng đã lâu năm");
}
