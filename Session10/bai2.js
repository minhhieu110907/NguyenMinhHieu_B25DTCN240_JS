const player = {
    name: "Kevin DeBruyne",
    position: "Midfielder",
    goals: 8,
    assists: 25,
    matchesPlayed: 35
};

function  addPerformanceScore(player) {
    let performance = ((player.goals + player.assists)/player.matchesPlayed).toFixed(2);
    player.performancePerMatch = +performance;
    player.isKeyPlayer = performance >= 1.0;
    for ( let i in player) {
        console.log(i, ":" ,player[i]);
    }
}

addPerformanceScore(player);