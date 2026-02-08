let players = [];
let goals = [];

function addPlayer(name, goal) {
  players.push(name);
  goals.push(goal);
  alert(`Đã thêm ${name} thành công.`);
}

function showSquad() {
  if (players.length === 0) {
    alert("Đội bóng chưa có cầu thủ.");
    return;
  }
  let output = "";
  for (let i = 0; i < players.length; i++) {
    output += `${i + 1}. ${players[i]} - ${goals[i]} bàn\n`;
  }
  alert(output);
}

const getTotalGoals = function () {
  let total = 0;
  for (let i = 0; i < goals.length; i++) {
    total += goals[i];
  }
  return total;
};

function findMostGoals(goalsArray) {
  let max = goalsArray[0];
  for (let i = 1; i < goalsArray.length; i++) {
    if (goalsArray[i] > max) {
      max = goalsArray[i];
    }
  }
  return max;
}

let menu =
`--- QUẢN LÝ ĐỘI BÓNG ---
1. Nhập cầu thủ mới
2. Xem danh sách đội hình
3. Xem thành tích toàn đội
4. Tìm Vua phá lưới
0. Thoát`;

let choice;

do {
  choice = +prompt(menu);

  switch (choice) {
    case 1:
      let name = prompt("Nhập tên cầu thủ:");
      let goal = +prompt("Nhập số bàn thắng:");
      addPlayer(name, goal);
      break;

    case 2:
      showSquad();
      break;

    case 3:
      alert(`Tổng số bàn thắng của cả đội là: ${getTotalGoals()} bàn.`);
      break;

    case 4:
      if (goals.length === 0) {
        alert("Chưa có dữ liệu cầu thủ.");
      } else {
        let maxGoals = findMostGoals(goals);
        alert(`Vua phá lưới hiện tại ghi được: ${maxGoals} bàn.`);
      }
      break;

    case 0:
      alert("Thoát chương trình.");
      break;

    default:
      alert("Lựa chọn không hợp lệ.");
  }

} while (choice !== 0);
