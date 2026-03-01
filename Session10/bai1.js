const player = {
    name: "Messi",
    position: "Forward",
    age:36,
    goals:25,
    assists:15,
};

function showPlayerInfo (player) {
    alert(`Tên: ${player.name}\nVị trí: ${player.position}\nTuổi: ${player.age}\nBàn thắng mùa này: ${player.goals}\nKiến tạo mùa này: ${player.assists}\nTổng đóng góp: ${player.goals + player.assists}`);
}

showPlayerInfo(player);