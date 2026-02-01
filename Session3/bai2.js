let totalReturn = +prompt("Hôm nay có bao nhiêu trả sách?");
if (Number.isNaN(totalReturn) || totalReturn <= 0) {
  alert("Số lượt mượn sách không phù hợp");
} else {
  for (let i = 0; i < totalBorrow; i++) {
    let userName = prompt("Tên người mượn");
    let bookName = prompt("Tên sách");
    let borrowDays;
    let lateCount = 0;
    do {
      borrowDays = +prompt("Số ngày mượn");
      if (borrowDays < 1 || Number.isNaN(borrowDays)) {
        alert("Số ngày mượn thực tế không hợp lệ.Vui lòng nhập lại");
      }
    } while (borrowDays < 1 || Number.isNaN(borrowDays));

    if (borrowDays <= 14) {
      alert("Trả đúng hạn");
    } else if (borrowDays <= 21) {
      alert("Trả muộn nhẹ");
      alert("Phạt nhắc nhở");
      lateCount++;
    } else {
      alert("Quá hạn nghiêm trọng");
      alert("Cần ghi biên bản phạt");
      lateCount++;
    }
  }
  alert(`Tổng số lượt trả sách: ${totalReturn}`);
  alert(`Số lượt trả muộn (>= 15 ngày): ${lateCount}`);
}
