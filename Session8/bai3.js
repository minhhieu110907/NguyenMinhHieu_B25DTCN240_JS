const players = [
  "Messi - Forward",
  "Ronaldo - Forward",
  "Neymar - Forward",
  "De Bruyne - Midfielder",
  "Kante - Midfielder",
  "Van Dijk - Defender",
  "Alisson - Goalkeeper",
];

function filterPlayersByPosition(position, players) {
  return players.filter(player => {
    let playerPosition = player.split(" - ")[1];
    return playerPosition === position;
  });
}

let input = prompt("Nhập vào vị trí cầu thủ");
let result = filterPlayersByPosition(input, players);
console.log(result);