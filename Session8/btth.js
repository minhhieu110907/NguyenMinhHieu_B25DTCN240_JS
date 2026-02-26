const squad = [
  ["Nguyen Van A", 10, "FW"],
  ["Tran Van B", 5, "MF"],
  ["Le Van C", 2, "DF"],
  ["Pham Van D", 12, "FW"],
  ["Hoang Van E", 0, "GK"],
  ["Dang Van F", 7, "MF"],
];

function showSquad(squad) {
  if (squad.length === 0) {
    alert("Đội bóng chưa có cầu thủ.");
    return;
  }
  let output = "";
  squad.forEach((player) => {
    output += `Tên: ${player[0]} | Bàn thắng: ${player[1]} | Vị trí: ${player[2]}\n`;
  });
  alert(output);
}

function filterPlayersByPosition(result){
      if (result.length === 0) {
        alert("Không có cầu thủ ở vị trí này");
      } else {
        let output = "";
        result.forEach((player) => {
          output += `${player[0]} - ${player[1]} bàn - ${player[2]}\n`;
        });
        alert(output);
      }
}

function getTotalGoals(squad) {
  let totalGoals = squad.reduce((sum, player) => sum + player[1], 0);
  alert(`Tổng số bàn thắng của cả đội là: ${totalGoals}`);
  return totalGoals;
}

let menu = `--- QUẢN LÝ ĐỘI BÓNG ---
1. Xem danh sách
2. Tìm kiếm (Find)
3. Lọc vị trí (Filter)
4. Tổng bàn thắng (Reduce)
5. Kiểm tra hiệu suất (Some/Every)
0. Thoát`;

let choice;

do {
  choice = +prompt(menu);

  switch (choice) {
    case 1:
      showSquad(squad);
      break;

    case 2: {
      let input = prompt("Nhập vào tên cầu thủ");
      let result = squad.find(
        (player) => player[0].toLowerCase() === input.toLowerCase(),
      );
      alert(result ? result : "Không tìm thấy cầu thủ");
      break;
    }

    case 3: {
     let position = prompt("Nhập vào vị trí muốn tìm (FW, MF, DF, GK)");
     let result = squad.filter((player) => player[2].toLowerCase() === position.toLowerCase());

     filterPlayersByPosition(result);
     break;
    }

    case 4: {
      getTotalGoals(squad);
      break;
    }

    case 5: {
      if (squad.some((player) => player[1] === 0)) {
        alert("Có cầu thủ chưa ghi bàn");
      }

      if (squad.every((player) => player[1] > 0)) {
        alert("Tất cả cầu thủ đều đã ghi bàn");
      }
      break;
    }

    case 0: {
      alert("Thoát chương trình.");
      break;
    }

    default:
      alert("Lựa chọn không hợp lệ.");
  }
} while (choice !== 0);
