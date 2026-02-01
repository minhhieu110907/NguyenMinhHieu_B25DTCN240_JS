let extension = confirm("Có yêu cầu gia hạn mới không?");

if (!extension) {
  alert("Bạn đã chọn không gia hạn");
} else {
  let userName = prompt("Tên bạn đọc");
  let bookName = prompt("Tên sách");
  let currentBorrowDays;
  let renewalDays;
  do {
    currentBorrowDays = +prompt("Số ngày đã mượn hiện tại");
    renewalDays = +prompt("Số ngày muốn gia hạn thêm");
    if (
      currentBorrowDays < 1 ||
      Number.isNaN(currentBorrowDays) ||
      renewalDays < 1 ||
      Number.isNaN(renewalDays)
    ) {
      alert("Số ngày đã mượn hoặc gia hạn không hợp lệ. Vui lòng nhập lại");
    }
  } while (
    currentBorrowDays < 1 ||
    Number.isNaN(currentBorrowDays) ||
    renewalDays < 1 ||
    Number.isNaN(renewalDays)
  );

  let totalDays = currentBorrowDays + renewalDays;
}

if (totalDays > 60) {
  alert("Không được gia hạn: Tổng thời gian vượt quá 60 ngày tối đa");
} else if (currentBorrowDays > 45) {
  alert("Không được gia hạn: Đã mượn quá lâu (>45 ngày)");
} else {
  alert("Gia hạn thành công");
}
