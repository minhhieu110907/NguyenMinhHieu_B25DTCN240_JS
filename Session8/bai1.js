const players = [
  "Messi - Forward",
  "Ronaldo - Forward",
  "Neymar - Forward",
  "De Bruyne - Midfielder",
  "Kante - Midfielder",
  "Van Dijk - Defender",
  "Alisson - Goalkeeper",
];

function displayPlayers(playersList) {
    let result = ""; 
    playersList.forEach(player => {
        result += player + "\n"; 
    });
    alert(result);
}

displayPlayers(players);