let readerCardIds = [];
let readerNames = [];
let borrowedBookCodes = [];
let overdueDays = [];

let n;
do {
  n = +prompt("Hôm nay có bao nhiêu bạn đọc bị ghi nhận quá hạn?");
} while (!Number.isInteger(n) || n <= 0);

for (let i = 0; i < n; i++) {
  let cardId, name, books, days;

  do {
    cardId = prompt(`Nhập mã thẻ bạn đọc thứ ${i + 1}:`).trim();
  } while (!cardId || readerCardIds.includes(cardId));

  do {
    name = prompt(`Nhập tên bạn đọc thứ ${i + 1}:`).trim();
  } while (!name);

  do {
    books = prompt(
      `Nhập các mã sách đang mượn của bạn đọc thứ ${i + 1} (cách nhau bởi dấu phẩy):`
    ).trim();
  } while (!books);

  do {
    days = +prompt(`Nhập số ngày quá hạn của bạn đọc thứ ${i + 1}:`);
  } while (!Number.isInteger(days) || days < 0);

  readerCardIds.push(cardId);
  readerNames.push(name);
  borrowedBookCodes.push(books);
  overdueDays.push(days);
}

let countOver10 = 0;
for (let i = 0; i < overdueDays.length; i++) {
  if (overdueDays[i] >= 10) countOver10++;
}

let jsPytReaders = [];
for (let i = 0; i < borrowedBookCodes.length; i++) {
  let codes = borrowedBookCodes[i];
  if (codes.includes("JS") && codes.includes("PYT")) {
    jsPytReaders.push(readerCardIds[i]);
  }
}

let maxIndex = 0;
for (let i = 1; i < overdueDays.length; i++) {
  if (overdueDays[i] > overdueDays[maxIndex]) {
    maxIndex = i;
  }
}

let over7Count = 0;
for (let i = 0; i < overdueDays.length; i++) {
  if (overdueDays[i] >= 7) over7Count++;
}

let warning;
switch (true) {
  case over7Count === 0:
    warning = "Tình hình trả sách hôm nay khá tốt!";
    break;
  case over7Count >= 1 && over7Count <= 4:
    warning = "Cần gửi nhắc nhở cho một số bạn đọc!";
    break;
  default:
    warning = "Tình trạng quá hạn nghiêm trọng! Cần liên hệ ngay!";
}

console.log(`Danh sách bạn đọc quá hạn (${n} người):`);
for (let i = 0; i < n; i++) {
  console.log(
    `${i + 1}. Mã thẻ: ${readerCardIds[i]} | Tên: ${readerNames[i]} | Sách đang mượn: ${borrowedBookCodes[i]} | Quá hạn: ${overdueDays[i]} ngày`
  );
}

console.log("");
console.log(`Tổng số bạn đọc quá hạn ≥ 10 ngày: ${countOver10} người`);
console.log("");
console.log(
  `Các bạn đọc đang mượn cả sách JS* và PYT*: ${jsPytReaders.join(", ")}`
);
console.log("");
console.log(
  `Bạn đọc có số ngày quá hạn cao nhất: ${readerNames[maxIndex]} (${overdueDays[maxIndex]} ngày)`
);
console.log("");
console.log(warning);
