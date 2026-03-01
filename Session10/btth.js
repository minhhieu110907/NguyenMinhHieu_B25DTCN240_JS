let squad = [
  { id: 1, name: "Nguyen Van A", goals: 10, position: "FW" },
  { id: 2, name: "Tran Van B", goals: 5, position: "MF" },
  { id: 3, name: "Le Van C", goals: 0, position: "DF" },
  { id: 4, name: "Pham Van D", goals: 12, position: "FW" },
  { id: 5, name: "Dang Van E", goals: 0, position: "GK" },
];

let menu = `--- FOOTBALL MANAGER PRO ---
1. Xem đội hình
2. Thêm cầu thủ
3. Tìm kiếm (theo ID)
4. Cập nhật bàn thắng
5. Xóa cầu thủ (Chuyển nhượng)
0. Thoát`;

let choice;

do {
  choice = +prompt(menu);
  switch (choice) {
    case 1: {
      if (squad.length === 0) {
        alert("Danh sách đội bóng đang trống!");
        break;
      }

      let output = "";
      squad.forEach((player) => {
        output += `Mã:${player.id} - ${player.name} (${player.position}): [${player.goals}] bàn\n`;
      });
      alert(output);
      break;
    }

    case 2: {
        let name = prompt("Nhập tên cầu thủ");
        let goals = +prompt(`Nhập số bàn thắng của cầu thủ ${name}`);
        let position = prompt("Nhập vị trí");

        let maxID = Math.max(...squad.map(player => player.id));
        let newId = maxID + 1;

        let newPlayer = {
            id: newId,
            name,
            goals,
            position
        };

        squad.push(newPlayer);
        alert("Đã thêm thành công cầu thủ!!!");
        for ( let player of squad) {
            alert(`Mã:${player.id} - ${player.name} (${player.position}): [${player.goals}] bàn\n`);
        }
      break;
    }

    case 3: {
      let findByID = +prompt("Nhập ID cầu thủ bạn muốn xem thông tin");
      let result = squad.find(player => player.id === findByID);
      if (result) {
        alert(`ID: ${result.id} - Tên: ${result.name} - Bàn thắng: ${result.goals} - Vị trí: ${result.position}`);
      } else {
        alert("Không tìm thấy");
      }
      break;
    }

    case 4: {
      let IDUpdate = +prompt("Nhập vào ID cầu thủ vừa ghi bàn");
      let index = squad.findIndex(player => player.id === IDUpdate);

      if (index === -1){
        alert("Không có cầu thủ trong danh sách");
      } else {
        squad[index].goals++;
        alert(`Đã cập nhật bàn thắng cho cầu thủ [${squad[index].name}] thành [${squad[index].goals}]`);
      }
      break;
    }

    case 5: {
      let deleteID = +prompt("Nhập vào ID cầu thủ cần xoá");
      let index = squad.findIndex(player => player.id === deleteID);

      if (index === -1){
        alert("Không có cầu thủ trong danh sách");
      } else {
        squad.splice(index,1);
        alert(`Đã xoá cầu thủ thành công!!!`);
      }
      break;
    }

    case 0: {
      alert("Cảm ơn bạn đã sử dụng chương trình");
      break;
    }

    default: {
      alert("Kết thúc chương trình");
    }
  }
} while (choice !== 0);
