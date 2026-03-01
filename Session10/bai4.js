const players = [
  { name: "Messi", years: 18, salary: 100 },
  { name: "Ronaldo", years: 20, salary: 95 },
  { name: "Neymar", years: 12, salary: 90 },
  { name: "Mbappe", years: 7, salary: 85 },
  { name: "Haaland", years: 5, salary: 80 },
  { name: "Modric", years: 22, salary: 70 },
  { name: "Benzema", years: 19, salary: 75 },
];

function analyzeSalary(minYears, teamPlayers) {
  let filteredPlayer = teamPlayers.filter((player) => player.years >= minYears);
  if (filteredPlayer.length === 0) {
    return {
      totalSalary: 0,
      highestPaid: null,
      lowestPaid: null,
    };
  }
  let totalSalary = filteredPlayer.reduce(
    (total, player) => total + player.salary,
    0,
  );

  let highestPaid = filteredPlayer.reduce((max, player) =>
    player.salary > max.salary ? player : max, filteredPlayer[0]
  );
  let lowestPaid = filteredPlayer.reduce((min, player) =>
    player.salary < min.salary ? player : min, filteredPlayer[0]
  );

  return {
  totalSalary,
  highestPaid,
  lowestPaid
  };
}

console.log(analyzeSalary(0, players));
