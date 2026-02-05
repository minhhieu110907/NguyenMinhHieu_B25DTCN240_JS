let booksId = [];
let booksName = [];
let booksCategory = [];
let inventoryQuantity = [];

let n;
do {
  n = +prompt("Có bao nhiêu loại sách cần nhập thông tin hôm nay?");
} while (!Number.isInteger(n) || n <= 0);

for (let i = 0; i < n; i++) {
  let id, name, category, quantity;

  do {
    id = prompt(`Nhập mã sách thứ ${i + 1}:`).trim();
  } while (!id || booksId.includes(id));

  do {
    name = prompt(`Nhập tên sách thứ ${i + 1}:`).trim();
  } while (!name);

  do {
    category = prompt(
      `Nhập các thể loại của sách thứ ${i + 1} (các thể loại cách nhau bởi dấu phẩy):`
    ).trim();
  } while (!category);

  do {
    quantity = +prompt(`Nhập số lượng tồn kho của sách thứ ${i + 1}:`);
  } while (!Number.isInteger(quantity) || quantity < 0);

  booksId.push(id);
  booksName.push(name);
  booksCategory.push(category);
  inventoryQuantity.push(quantity);
}

let countProgramming = 0;
for (let i = 0; i < booksCategory.length; i++) {
  if (booksCategory[i].toLowerCase().includes("lập trình")) {
    countProgramming++;
  }
}

let jsWebBooks = [];
for (let i = 0; i < booksCategory.length; i++) {
  let cate = booksCategory[i].toLowerCase();
  switch (true) {
    case cate.includes("javascript") && cate.includes("web"):
      jsWebBooks.push(booksId[i]);
      break;
  }
}

let minIndex = 0;
for (let i = 1; i < inventoryQuantity.length; i++) {
  if (inventoryQuantity[i] < inventoryQuantity[minIndex]) {
    minIndex = i;
  }
}

console.log(`Tổng số sách thuộc thể loại 'Lập trình': ${countProgramming}`);

console.log(
  "Danh sách mã sách thuộc cả hai thể loại 'JavaScript' và 'Web':"
);
jsWebBooks.forEach((id) => console.log(id));

console.log("Loại sách có số lượng tồn kho thấp nhất:");
console.log(
  `Mã sách: ${booksId[minIndex]}, Tên sách: ${booksName[minIndex]}, Tồn kho: ${inventoryQuantity[minIndex]}`
);
