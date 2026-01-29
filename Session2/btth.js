let username = prompt("Mời bạn nhập vào tên: ");
let role = prompt("Mời bạn nhập vào vai trò(guest/ admin/ students): ");
let cardBalance = +prompt("Mời bạn nhập vào số dư tài khoản thẻ: ");
let cardStatus = prompt(
  "Mời bạn nhập vào trạng thái thẻ(Nhập true nếu thẻ còn hoạt động): ",
);
let overdueDays = +prompt("Mời bạn nhập vào sô ngày quá hạn: ");

switch (role) {
  case "admin":
    console.log("Chào Admin, bạn có toàn quyền hệ thống");
    break;
  case "students":
    console.log("Chào sinh viên, bạn có thể mượn sách");
    break;
  case "guest":
    console.log("Chào khách, bạn chỉ có thể đọc tại chỗ");
    break;
  default:
    console.log("Lỗi: Vai trò không hợp lệ!");
}

let canBorrow = true;
if (
  !username ||
  !isNaN(username) ||
  (role !== "student" && role !== "admin") ||
  cardStatus !== "true" ||
  cardBalance <= 0
) {
  console.log("Yêu cầu bị từ chỗi");
  canBorrow = false;
} else {
  console.log("Được phép mượn sách");
}

let fine = 0;
if (overdueDays <= 0) {
  console.log("Cảm ơn bạn đã trả đúng hạn");
} else if (overdueDays >= 1 && overdueDays <= 5) {
  fine = 5000 * overdueDays;
  console.log(`Tiền phạt của bạn là: ${fine}`);
} else if (overdueDays >= 6 && overdueDays <= 10) {
  fine = 10000 * overdueDays;
  console.log(`Tiền phạt của bạn là: ${fine}`);
} else if (overdueDays > 10) {
  fine = 200000;
  console.log(`Tiền phạt của bạn là: ${fine}`);
  console.log("Tài khoản của bạn bị khoá");
}

console.log(`
--- HỆ THỐNG MƯỢN TRẢ ---
Người dùng: ${username || "Không xác định"};
Quyền hạn: Chào ${role}, bạn có thể mượn sách;
Kết quả mượn: ${canBorrow ? "ĐƯỢC PHÉP MƯỢN SÁCH" : "KHÔNG ĐƯỢC PHÉP MƯỢN SÁCH"};
Tình trạng trả sách: ${overdueDays > 0 ? "Quá hạn " + overdueDays + " ngày" : "Đúng hạn"} ngày;
Tiền phạt: ${fine} VNĐ;
`);
