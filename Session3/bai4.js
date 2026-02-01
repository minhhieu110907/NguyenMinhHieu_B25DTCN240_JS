let checkedBook = 0,
  numberOfLostBook = 0,
  outOfOrder = 0,
  normalStock = 0,
  highStock = 0;
let option;

do {
  let rawOption = prompt("Tiếp tục kiểm kê sách tiếp theo? (Có/ Không)");
  if (rawOption === null) {
    option = "không"; 
  } else {
    option = rawOption.toLowerCase();
  }
  if (option === "không") {
    alert(`Tổng số sách đã kiểm kê: ${checkedBook} cuốn
Số sách mất: ${numberOfLostBook} cuốn
Số sách hết hàng: ${outOfOrder} cuốn`);
  } else if (option === "có") {
    checkedBook += 1;
    let bookCode = prompt("Nhập mã sách");
    if (bookCode === null) 
        continue;

    let bookName = prompt("Nhập tên sách");
    if (bookName === null) 
        continue;

    let numberOfBooks;
    do {
      let rawNum = prompt("Nhập số lượng sách thực tế đang có trong kho");
      if (rawNum === null) {
        numberOfBooks = -1; 
        break; 
      }
      numberOfBooks = +rawNum;
      if (
        rawNum === "" ||
        numberOfBooks < 0 ||
        isNaN(numberOfBooks) ||
        !Number.isInteger(numberOfBooks)
      ) {
        alert("Số lượng sách không hợp lệ. Vui lòng nhập lại");
      }
    } while (
      numberOfBooks < 0 ||
      isNaN(numberOfBooks) ||
      !Number.isInteger(numberOfBooks)
    );

    if (numberOfBooks === -1) 
        continue;

    let bookStatusOption;
    do {
      let rawStatus = prompt("Tình trạng sách (1-Bình thường, 2-Mất)");
      if (rawStatus === null) {
        bookStatusOption = -1;
        break;
      }
      bookStatusOption = +rawStatus;
      if (
        (bookStatusOption !== 1 && bookStatusOption !== 2) ||
        isNaN(bookStatusOption)
      ) {
        alert("Lựa chọn không hợp lệ. Vui lòng nhập lại");
      }
    } while (
      (bookStatusOption !== 1 && bookStatusOption !== 2) ||
      isNaN(bookStatusOption)
    );

    if (bookStatusOption === -1) 
        continue;
    if (bookStatusOption === 2) {
      numberOfLostBook += 1;
    } else if (bookStatusOption === 1) {
      if (numberOfBooks === 0) {
        outOfOrder += 1;
      } else if (numberOfBooks >= 1 && numberOfBooks <= 9) {
        normalStock += 1;
      } else {
        highStock += 1;
      }
    }
  } else {
    alert('Vui lòng chỉ nhập "có" hoặc "không"');
  }
} while (option !== "không");
