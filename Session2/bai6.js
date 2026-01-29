let bookName = prompt("Tên sách:");
let username = prompt("Tên người mượn: ");
let bookStatus = prompt("Tình trạng sách(có sẵn/ đã mượn/ không có sẵn): ");
let borrowDays = prompt("Số ngày mượn sách: ");
let hasCard = prompt(
  "Người mượn có thẻ thư viện không?( True - có / False - không): ",
);

let isHasCard = hasCard === "true";

if (bookStatus === "có sẵn") {
  if (isHasCard) {
    console.log("Chúc mừng, bạn có thể mượn sách này");
  } else {
    console.log("Bạn không thể mượn sách nếu không có thẻ thư viện");
  }
} else if (bookStatus === "đã mượn") {
  if (borrowDays < 30) {
    if (isHasCard) {
      console.log("Sách đang được mượn, vui lòng đợi đến khi trả lại");
    } else {
      console.log("Bạn không thể mượn sách nếu không có thẻ thư viện");
    }
  } else {
    console.log("Sách đã được mượn quá lâu, vui lòng liên hệ thư viện");
  }
} else if (bookStatus === "không có sẵn") {
  console.log(
    "Sách này hiện tại không có sẵn trong thư viện, bạn có thể đăng ký mượn sau",
  );
} else {
  console.log("Thông tin không hợp lệ, vui lòng nhập lại");
}
