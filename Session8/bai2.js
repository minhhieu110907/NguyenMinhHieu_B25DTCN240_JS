const namePlayers = [
  "Messi - Forward",
  "Ronaldo - Forward",
  "Neymar - Forward",
  "De Bruyne - Midfielder",
  "Kante - Midfielder",
  "Van Dijk - Defender",
  "Alisson - Goalkeeper",
];

function  getUpperNames (namePlayerList) {
    let nameList = namePlayerList.map((name)=> name.toUpperCase());
    return (nameList);
}

let result = getUpperNames(namePlayers);
alert(result);