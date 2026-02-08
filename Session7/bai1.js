let playerIds = [];
let playerPositions = [];

let n;
do {
  n = +prompt("Có bao nhiêu cầu thủ cần nhập vào đội bóng?");
} while (n <= 0 || !Number.isInteger(n));

for (let i = 0; i < n; i++) {
  let id;
  let duplicate;

  do {
    id = prompt(`Nhập mã cầu thủ ${i + 1}:`).trim();
    duplicate = false;

    for (let j = 0; j < playerIds.length; j++) {
      if (playerIds[j] === id) {
        duplicate = true;
        alert("Mã cầu thủ đã tồn tại!");
        break;
      }
    }
  } while (!id || duplicate);

  playerIds.push(id);

  let choice;
  do {
    choice = +prompt("Nhập vị trí (1: Thủ môn, 2: Hậu vệ, 3: Tiền vệ, 4: Tiền đạo):");
  } while (choice < 1 || choice > 4);

  let position;
  if (choice === 1) position = "Thủ môn";
  else if (choice === 2) position = "Hậu vệ";
  else if (choice === 3) position = "Tiền vệ";
  else position = "Tiền đạo";

  playerPositions.push(position);
}

function printTeamRoster() {
  console.log(`Đội bóng hiện tại (${playerIds.length} cầu thủ):`);
  for (let i = 0; i < playerIds.length; i++) {
    console.log(`${i + 1}. ${playerIds[i]} - ${playerPositions[i]}`);
  }
}

function findPlayersByPosition(position) {
  let indexes = [];
  for (let i = 0; i < playerPositions.length; i++) {
    if (playerPositions[i] === position) {
      indexes.push(i);
    }
  }
  return indexes;
}

printTeamRoster();

let countChoice;
do {
  countChoice = +prompt("Nhập vị trí cầu thủ muốn đếm (1: Thủ môn, 2: Hậu vệ, 3: Tiền vệ, 4: Tiền đạo):");
} while (countChoice < 1 || countChoice > 4);

let countPosition;
if (countChoice === 1) countPosition = "Thủ môn";
else if (countChoice === 2) countPosition = "Hậu vệ";
else if (countChoice === 3) countPosition = "Tiền vệ";
else countPosition = "Tiền đạo";

let result = findPlayersByPosition(countPosition);

console.log(`Số cầu thủ ở vị trí ${countPosition}: ${result.length}`);
console.log(`Các chỉ số cầu thủ ở vị trí ${countPosition}: ${result.join(", ")}`);
