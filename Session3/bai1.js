let totalBorrow = +prompt("Hôm nay có bao nhiêu lượt mượn sách?");
if (Number.isNaN(totalBorrow) || totalBorrow <= 0) {
  alert("Số lượt mượn sách không phù hợp");
} else {
  for (let i = 0; i < totalBorrow; i++) {
    let userName = prompt("Tên người mượn");
    let bookName = prompt("Tên sách");
    let borrowDays = +prompt("Số ngày mượn");
    if (borrowDays > 14) {
      alert("Cảnh báo: Thời gian mượn vượt quy định (tối đa 14 ngày)");
    } else {
      alert("Mượn thành công");
    }
  }

  alert(`Tổng số lượt mượn là: ${totalBorrow}`);
}
