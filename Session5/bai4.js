let booksId = [];
let booksName = [];
let bookStatus = [];

let n;

do {
  n = +prompt("Có bao nhiêu cuốn sách cần kiểm tra tình trạng hôm nay?");
} while (n <= 0 || !Number.isInteger(n));

for (let i = 1; i <= n; i++) {
  let id, name, statusChoice;

  do {
    id = prompt(`Nhập mã sách ${i}`);
  } while (!id || !id.trim());

  do {
    name = prompt(`Nhập tên sách ${i}`);
  } while (!name || !name.trim());

  do {
    statusChoice = +prompt(
      "Chọn tình trạng ban đầu:\n1. Hỏng nhẹ\n2. Hỏng nặng\n3. Cần sửa gấp"
    );
  } while (![1, 2, 3].includes(statusChoice));

  let status =
    statusChoice === 1 ? "Hỏng nhẹ" :
    statusChoice === 2 ? "Hỏng nặng" :
    "Cần sửa gấp";

  booksId.push(id.trim());
  booksName.push(name.trim());
  bookStatus.push(status);
}

function printList() {
  let text = `Danh sách hiện tại (${booksId.length} cuốn):\n`;
  for (let i = 0; i < booksId.length; i++) {
    text += `${i + 1}. ${booksId[i]} - ${booksName[i]} - ${bookStatus[i]}\n`;
  }
  alert(text);
  console.log(text);
}

printList();

let choice;

do {
  choice = +prompt(
    "Chọn chức năng:\n1. Sửa tình trạng sách\n2. Loại bỏ sách\n0. Kết thúc và in báo cáo"
  );

  switch (choice) {
    case 1: {
      let code = prompt("Nhập mã sách cần sửa");
      let index = booksId.indexOf(code);

      if (index === -1) {
        alert("Không tìm thấy mã sách");
        break;
      }

      let newStatus;
      do {
        newStatus = +prompt(
          "Chọn tình trạng mới:\n1. Hỏng nhẹ\n2. Hỏng nặng\n3. Cần sửa gấp\n4. Đã sửa xong\n5. Loại bỏ"
        );
      } while (![1, 2, 3, 4, 5].includes(newStatus));

      switch (newStatus) {
        case 1: bookStatus[index] = "Hỏng nhẹ"; break;
        case 2: bookStatus[index] = "Hỏng nặng"; break;
        case 3: bookStatus[index] = "Cần sửa gấp"; break;
        case 4: bookStatus[index] = "Đã sửa xong"; break;
        case 5: bookStatus[index] = "Loại bỏ"; break;
      }

      printList();
      break;
    }

    case 2: {
      let code = prompt("Nhập mã sách cần xóa");
      let index = booksId.indexOf(code);

      if (index === -1) {
        alert("Không tìm thấy mã sách");
        break;
      }

      booksId.splice(index, 1);
      booksName.splice(index, 1);
      bookStatus.splice(index, 1);

      printList();
      break;
    }
  }
} while (choice !== 0);

let fixed = 0;
let removed = 0;

for (let status of bookStatus) {
  if (status === "Đã sửa xong") fixed++;
  if (status === "Loại bỏ") removed++;
}

let report = "";
report += "BÁO CÁO CUỐI NGÀY\n";
report += `Tổng số sách còn lại: ${booksId.length}\n`;
report += `Số sách đã sửa xong: ${fixed}\n`;
report += `Số sách loại bỏ: ${removed}\n\n`;
report += "Danh sách sách còn lại:\n";

for (let i = 0; i < booksId.length; i++) {
  report += `${i + 1}. ${booksId[i]} - ${booksName[i]} - ${bookStatus[i]}\n`;
}

alert(report);
console.log(report);
