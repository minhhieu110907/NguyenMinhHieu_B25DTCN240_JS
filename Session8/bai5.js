const players = [
  "Messi - Forward - 25 - 15",
  "Ronaldo - Forward - 30 - 10",
  "Neymar - Forward - 18 - 20",
  "De Bruyne - Midfielder - 8 - 25",
  "Kante - Midfielder - 2 - 5",
  "Van Dijk - Defender - 5 - 3",
  "Alisson - Goalkeeper - 0 - 1",
];

function reportTopPerformers (minPerformance,players){
  let worldClass = players.map(player => {
    const part = player.split(" - ");
    const name = part[0];
    const goal = +part[2];
    const assist = +part[3];
    return {
    name,
    performance: goal + assist
  };
  }).filter(player => player.performance >= minPerformance);

  let totalGoalsAndAssist = worldClass.reduce((sum ,player) => sum + player.performance,0);

  let result = worldClass.map(player => `${player.name}: ${player.performance}`);
  console.log(result.join("\n"));
  console.log(`Tổng hiệu suất: ${totalGoalsAndAssist}`);
  
  return totalGoalsAndAssist;
}