let booksId = [], booksName = [], inventoryQuantity = [];
let bookType, bookCode, bookName, currentStockQuantity;
let output = "";

do {
  bookType = +prompt("Có bao nhiêu loại sách cần kiểm tra bổ sung hôm nay?");
  if (bookType <= 0 || !Number.isInteger(bookType)) {
    alert("Số loại sách phải là số nguyên dương. Vui lòng nhập lại");
  }
} while (bookType <= 0 || !Number.isInteger(bookType));

for (let i = 1; i <= bookType; i++) {

  do {
    bookCode = prompt(`Nhập vào mã sách ${i}`);
    if (!bookCode || !bookCode.trim()) {
      alert("Mã sách không được để trống");
    }
  } while (!bookCode || !bookCode.trim());

  do {
    bookName = prompt(`Nhập vào tên sách ${i}`);
    if (!bookName || !bookName.trim()) {
      alert("Tên sách không được để trống");
    }
  } while (!bookName || !bookName.trim());

  do {
    currentStockQuantity = +prompt("Nhập vào số lượng tồn kho hiện tại");
    if (!Number.isInteger(currentStockQuantity) || currentStockQuantity < 0) {
      alert("Số lượng tồn kho phải là số nguyên ≥ 0");
    }
  } while (!Number.isInteger(currentStockQuantity) || currentStockQuantity < 0);

  booksId.push(bookCode.trim());
  booksName.push(bookName.trim());
  inventoryQuantity.push(currentStockQuantity);
}

output += `Danh sách sách cần xem xét bổ sung (${booksId.length} loại):\n`;

let lowStockCount = 0;
let outOfStockList = [];

for (let i = 0; i < booksId.length; i++) {
  output += `${i + 1}. Mã: ${booksId[i]} - Tên: ${booksName[i]} - Còn: ${inventoryQuantity[i]} bản\n`;

  if (inventoryQuantity[i] <= 5) {
    lowStockCount++;
  }

  if (inventoryQuantity[i] === 0) {
    outOfStockList.push(booksId[i]);
  }
}

output += `\nSố sách có tồn kho ≤ 5 bản: ${lowStockCount} loại\n`;
output += `Các mã sách đã hết hàng (0 bản): `;

if (outOfStockList.length > 0) {
  output += outOfStockList.join(", ");
} else {
  output += "Không có";
}

alert(output);
console.log(output);
