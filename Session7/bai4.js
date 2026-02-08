let players = [
  "P001-Nguyễn Văn A-Thủ môn",
  "P002-Trần Thị B-Hậu vệ",
  "P003-Lê Văn C-Hậu vệ",
  "P004-Phạm Văn D-Tiền vệ",
  "P005-Hoàng Thị E-Tiền đạo",
  "P006-Vũ Minh F-Tiền đạo",
  "P007-Đặng Văn G-Thủ môn"
];

function printTeamRoster() {
  console.log("Danh sách cầu thủ:");
  for (let i = 0; i < players.length; i++) {
    let parts = players[i].split("-");
    console.log(`${i + 1}. ${parts[0]} | ${parts[1]} | ${parts[2]}`);
  }
}

function countPlayerByPostion(players) {
  let result = {};

  for (let i = 0; i < players.length; i++) {
    let position = players[i].split("-")[2];
    if (result[position]) {
      result[position]++;
    } else {
      result[position] = 1;
    }
  }

  return result;
}

function hasGoalkeeper() {
  for (let i = 0; i < players.length; i++) {
    let position = players[i].split("-")[2];
    if (position === "Thủ môn") {
      return true;
    }
  }
  return false;
}

printTeamRoster();

let countResult = countPlayerByPostion(players);
console.log("Số lượng cầu thủ theo vị trí:");
for (let position in countResult) {
  console.log(`${position}: ${countResult[position]}`);
}

console.log("Đội có thủ môn không?", hasGoalkeeper());
