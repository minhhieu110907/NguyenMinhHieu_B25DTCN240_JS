let i = 0;
let correctPassword = "admin123";
while (i < 3) {
  let password = prompt("Nhập mật khẩu");
  if (!password || password !== correctPassword) {
    alert("Mật khẩu của bạn không đúng.");
    i++;
  } else {
    alert("Đăng nhập thành công");
    break;
  }
}

if (i == 3 && password !== correctPassword) {
  alert("Hệ thống bị khóa");
} else {
  let choice;
  do {
    choice = +prompt(`
Chọn chức năng:
1. Nhập lô sách mới;
2. Vẽ sơ đồ kệ sách;
3. Thoát;
`);
    switch (choice) {
      case 1:
        let bookCount = prompt("Nhập số cuốn sách");
        let totalPrice = 0;
        for (let j = 0; j < bookCount; j++) {
          let price = +prompt(`Nhập vào giá tiền của cuốn sách ${j + 1}`);
          if (price <= 0) {
            alert("Giá không hợp lệ, bỏ qua");
            continue;
          }
          totalPrice += price;
        }

        alert(`Tổng giá trị nhập kho đợt này là: ${totalPrice}`);
        break;

      case 2:
        for (let i = 0; i < 3; i++) {
          alert(`Khu ${i + 1}`);
          for (let j = 0; j < 5; j++) {
            if (j === 3 && i === 2) {
              console.log(`Khu vực ${i + 1} - Kệ ${j + 1} (Đang sửa chữa)`);
              continue;
            }
            alert(`Khu vực ${i + 1} - Kệ ${j + 1}`);
          }
        }
        break;

      case 3:
        alert("Hẹn gặp lại!");
        break;

      default:
        alert("Lựa chọn không hợp lệ");
    }
  } while (choice !== 3);
}
