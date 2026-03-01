const teamHistory = [
  {
    name: "Messi",
    position: "Forward",
    nationality: "Argentina",
    seasons: {
      "2022-2023": { matches: 34, goals: 21, assists: 14, yellowCards: 3 },
      "2023-2024": { matches: 32, goals: 25, assists: 15, yellowCards: 2 },
      "2024-2025": { matches: 28, goals: 18, assists: 12, yellowCards: 1 },
    },
  },
  {
    name: "Ronaldo",
    position: "Forward",
    nationality: "Portugal",
    seasons: {
      "2022-2023": { matches: 38, goals: 28, assists: 8, yellowCards: 5 },
      "2023-2024": { matches: 35, goals: 30, assists: 10, yellowCards: 4 },
      "2024-2025": { matches: 30, goals: 22, assists: 9, yellowCards: 3 },
    },
  },
];

function generatePlayerSeasonReport(playerName, teamHistory) {
  let player = teamHistory.find((p) => p.name === playerName);
  if (!player) {
    return `Không có dữ liệu cầu thủ ${playerName}`;
  }
  const seasonEntries = Object.entries(player.seasons);
  const stat = seasonEntries.reduce(
    (acc, [season, data]) => {
      acc.totalMatches += data.matches;
      acc.totalGoals += data.goals;
      acc.totalAssists += data.assists;
      acc.totalYellowCards += data.yellowCards;

      if (
        !acc.bestSeason ||
        data.goals > acc.bestSeason.goals ||
        (data.goals === acc.bestSeason.goals &&
          data.assists > acc.bestSeason.assists)
      ) {
        acc.bestSeason = {
          season: season,
          goals: data.goals,
          assists: data.assists,
        };
      }
      return acc;
    },
    {
      totalMatches: 0,
      totalGoals: 0,
      totalAssists: 0,
      totalYellowCards: 0,
      bestSeason: null,
    },
  );
  return `
    THỐNG KÊ CẦU THỦ: ${player.name}
    --------------------------
    - Tổng số trận: ${stat.totalMatches}
    - Tổng bàn thắng: ${stat.totalGoals}
    - Tổng kiến tạo: ${stat.totalAssists}
    - Thẻ vàng: ${stat.totalYellowCards}
    - Mùa giải bùng nổ nhất: ${stat.bestSeason.season} (${stat.bestSeason.goals} bàn) (${stat.bestSeason.assists} kiến tạo)
  `;
}


alert(generatePlayerSeasonReport("Ronaldo", teamHistory));