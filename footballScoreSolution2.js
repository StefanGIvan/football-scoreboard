function computeGameScore(team1, team2, playersWhoScore) {
  let i;
  let j;
  let foundPlayer = false;
  let uniquePlayers = [];
  let playerScored = [];

  //go through the playersWhoScore array
  for (i = 0; i <= playersWhoScore.length - 1; i++) {
    let rememberPlayer = playersWhoScore[i];

    //go through the uniquePlayers array and in this way, add a player just once (to not iterate through 2 teams arrays)
    //have a playerScored array to know how many times a player scored
    //a player can't be in both teams, because we can't determine that from the playersWhoScore array
    for (j = 0; j <= uniquePlayers.length - 1; j++) {
      if (uniquePlayers[j] === rememberPlayer) {
        playerScored[j]++;
        foundPlayer = true;
        break;
      }
    }

    if (foundPlayer === false) {
      uniquePlayers.push(rememberPlayer);
      playerScored.push(1);
      foundPlayer = false;
    }
  }
}
