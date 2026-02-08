let players = [];

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

    for (let j = 0; j < players.length; j++) {
      let currentId = players[j].split("-")[0];
      if (currentId === id) {
        duplicate = true;
        alert("Mã cầu thủ đã tồn tại!");
        break;
      }
    }
  } while (!id || duplicate);

  let name;
  do {
    name = prompt("Nhập tên cầu thủ:").trim();
  } while (!name);

  let choice;
  do {
    choice = +prompt("Nhập vị trí (1: Thủ môn, 2: Hậu vệ, 3: Tiền vệ, 4: Tiền đạo):");
  } while (choice < 1 || choice > 4);

  let position;
  if (choice === 1) position = "Thủ môn";
  else if (choice === 2) position = "Hậu vệ";
  else if (choice === 3) position = "Tiền vệ";
  else position = "Tiền đạo";

  players.push(`${id}-${name}-${position}`);
}

function printTeamRoster() {
  console.log(`Đội bóng hiện tại (${players.length} cầu thủ):`);
  for (let i = 0; i < players.length; i++) {
    let parts = players[i].split("-");
    console.log(`${i + 1}. ${parts[0]} - ${parts[1]} - ${parts[2]}`);
  }
}

function pushPlayer(name, position) {
  let id;
  let duplicate;

  do {
    id = prompt("Nhập mã cầu thủ mới:").trim();
    duplicate = false;

    for (let i = 0; i < players.length; i++) {
      if (players[i].split("-")[0] === id) {
        duplicate = true;
        alert("Mã cầu thủ đã tồn tại!");
        break;
      }
    }
  } while (!id || duplicate);

  players.push(`${id}-${name}-${position}`);
}

printTeamRoster();
