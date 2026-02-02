const correctUsername = "admin",
  correctPassword = 12345;
let logInCount = 0,
  specialNumberList = 0,
  scienceBook = 0,
  artBook = 0,
  totalBookCode = 0,
  count = 0;
let bookCode,
  rows,
  cols,
  output = "",
  attemps,
  numberOfBooks,
  maintenanceFee,
  time,
  totalFee,
  N,
  list = "";
while (logInCount < 3) {
  let userName = prompt("Nhập vào tài khoản").trim().toLowerCase();
  let password = +prompt("Nhập mật khẩu");
  if (
    !userName ||
    typeof userName !== "string" ||
    Number.isNaN(password) ||
    userName !== correctUsername ||
    password !== correctPassword
  ) {
    logInCount++;
    attemps = 3 - logInCount;
    alert(
      `Mật khẩu hoặc Tài khoản không hợp lệ. Vui lòng nhập lại ( Bạn còn ${attemps} lần thử`,
    );
    continue;
  } else if (userName === correctUsername && password === correctPassword) {
    alert("Đăng nhập thành công");
    let choice;
    do {
      choice = +prompt(`1.Phân loại mã số sách (Số nguyên chẵn/lẻ).
2.Thiết kế bản đồ kho sách (Dạng lưới).
3.Dự toán phí bảo trì sách theo năm.
4.Tìm mã số sách may mắn (Số nguyên tố/Số đặc biệt). 
5.Thoát.`);

      switch (choice) {
        case 1:
          do {
            bookCode = +prompt("Nhập mã sách");
            if (!Number.isInteger(bookCode)) {
              alert("Mã sách không hợp lệ.Vui lòng nhập lại");
            }
          } while (!Number.isInteger(bookCode));
          totalBookCode++;
          bookCode % 2 === 0
            ? (scienceBook++, alert("Đã thêm vào sách Khoa học"))
            : (artBook++, alert("Đã thêm vào sách Nghệ thuật"));

          if (bookCode === 0) {
            alert(`Tổng số lượng mã sách đã nhập: ${totalBookCode};
                Tổng số lượng Sách khoa học: ${scienceBook};
                Tổng số lượng Sách nghệ thuật: ${artBook};`);
          }
          break;
        case 2:
          do {
            rows = +prompt("Nhập số hàng");
            cols = +prompt("Nhập số cột");
            if (!Number.isInteger(rows) || !Number.isInteger(cols)) {
              alert("Số cột hoặc số hàng không hợp lệ. Vui lòng nhập lại");
            }
          } while (!Number.isInteger(rows) || !Number.isInteger(cols));

          for (let i = 1; i <= rows; i++) {
            for (let j = 1; j <= cols; j++) {
              if (i === j) {
                output += `[${i} - ${j}] (Kệ ưu tiên)\n`;
              } else {
                output += `[${i} - ${j}]\n`;
              }
            }
            alert(output);
          }
          break;
        case 3:
          do {
            numberOfBooks = +prompt("Nhập vào số lượng sách");
            maintenanceFee = +prompt("Nhập vào giá bảo trì 1 cuốn");
            time = +prompt("Nhập vào thời gian bảo trì ( năm ): ");
            totalFee = numberOfBooks * maintenanceFee;
            alert(`Tổng tiền bảo trì năm 1 là: ${totalFee}`);
            if (
              !Number.isInteger(numberOfBooks) ||
              !Number.isInteger(maintenanceFee)
            ) {
              alert("Số sách và Giá bảo trì phải là số nguyên");
            }
          } while (
            !Number.isInteger(numberOfBooks) ||
            !Number.isInteger(maintenanceFee)
          );
          for (let i = 2; i <= time; i++) {
            totalFee = Math.ceil(totalFee * 1.1);
            alert(`Tổng tiền bảo trì năm ${i} là: ${totalFee}`);
          }
          break;
        case 4:
          do {
            N = +prompt("Nhập vào số");
            if (N < 0 || !Number.isInteger(N)) {
              alert("Số không phù hợp. Nhập lại");
            }
          } while (N < 0 || !Number.isInteger(N));
          for (let i = 1; i < N; i++) {
            if (i % 3 === 0 && i % 5 !== 0) {
              count++;
              list += i + " ";
            }
          }
          alert(`Có ${count} số may mắn`);
          alert(`Danh sách các số trúng thưởng là: ${list}`);
          break;
        case 5:
          alert("Thoát chương trình! Cảm ơn bạn");
          break;
        default:
          alert("Lựa chọn không phù hợp");
      }
    } while (choice !== 5);
  } else {
    alert("Không hợp lệ");
  }
}
