const players = [
  "Messi - Forward - 25 - 15 - 34",
  "Ronaldo - Forward - 30 - 10 - 38",
  "Neymar - Forward - 18 - 20 - 32",
  "De Bruyne - Midfielder - 8 - 25 - 35",
  "Kante - Midfielder - 2 - 5 - 36",
  "Van Dijk - Defender - 5 - 3 - 33",
  "Alisson - Goalkeeper - 0 - 1 - 37",
];

function reportByPosition(players) {

  const parsed = players.map(p => p.split(" - "));

  const grouped = parsed.reduce((acc, player) => {
    const position = player[1];

    let group = acc.find(g => g[0] === position);

    if (!group) {
      group = [position, []];
      acc.push(group);
    }

    group[1].push(player);

    return acc;
  }, []);

  console.log("BÁO CÁO HIỆU SUẤT THEO VỊ TRÍ\n");

  let totalTeamGoals = 0;

  grouped.forEach(group => {

    const position = group[0];
    const playersInGroup = group[1];
    const count = playersInGroup.length;

    const totalGoals = playersInGroup.reduce((sum, p) => sum + Number(p[2]), 0);
    const totalAssists = playersInGroup.reduce((sum, p) => sum + Number(p[3]), 0);
    const totalMatches = playersInGroup.reduce((sum, p) => sum + Number(p[4]), 0);
    const avgPerformance = ((totalGoals + totalAssists) / totalMatches).toFixed(2);
    totalTeamGoals += totalGoals;

    console.log(position + ":\n");
    console.log("- Số cầu thủ:", count);
    console.log("- Tổng bàn thắng:", totalGoals);
    console.log("- Tổng kiến tạo:", totalAssists);
    console.log("- Tổng số trận:", totalMatches);
    console.log("- Trung bình hiệu suất/trận:", avgPerformance);
    console.log("\n");
  });

  console.log("------------------------\n");
  console.log("Tổng bàn thắng toàn đội :", totalTeamGoals);
}