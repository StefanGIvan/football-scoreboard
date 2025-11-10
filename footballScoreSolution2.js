function computeGameScore(team1, team2, playersWhoScore) {
  let scoreIndex;
  let team1Index;
  let team2Index;
  let team1Score = 0;
  let team2Score = 0;
  let uniquePlayersIndex;
  let rememberPlayer;
  let uniquePlayers = [];
  let playerGoalsCounter = [];
  let teamOfPlayer = [];

  // fill the uniquePlayers array from team1
  for (team1Index = 0; team1Index < team1.length; team1Index++) {
    uniquePlayers.push(team1[team1Index]);
    playerGoalsCounter.push(0);
    teamOfPlayer.push(1);
  }

  // fill the uniquePlayers array from team2
  for (team2Index = 0; team2Index < team2.length; team2Index++) {
    uniquePlayers.push(team2[team2Index]);
    playerGoalsCounter.push(0);
    teamOfPlayer.push(2);
  }

  // go through the playersWhoScore array
  for (scoreIndex = 0; scoreIndex <= playersWhoScore.length - 1; scoreIndex++) {
    rememberPlayer = playersWhoScore[scoreIndex];

    // go through the uniquePlayers array and in this way, add a player just once (to not iterate through 2 teams arrays)
    // have a playerGoalsCounter array to know how many times a player scored
    // a player can't be in both teams, because we can't determine that from the playersWhoScore array
    // we know how many times a player has scored (array version)
    for (
      uniquePlayersIndex = 0;
      uniquePlayersIndex <= uniquePlayers.length - 1;
      uniquePlayersIndex++
    ) {
      // the player already scored once
      if (uniquePlayers[uniquePlayersIndex] === rememberPlayer) {
        // if we find the player, add a goal into the playerGoalsCounter array
        playerGoalsCounter[uniquePlayersIndex]++;

        // we determine from which team that player is from and add a goal for that team
        if (teamOfPlayer[uniquePlayersIndex] === 1) {
          team1Score++;
        } else {
          team2Score++;
        }

        break;
      }
    }
  }

  return "Team1" + " " + team1Score + " - " + team2Score + " " + "Team2";
}

const team1 = ["Dembele", "Gomez", "Zouma"];
const team2 = ["Arnautovic", "Salah", "Mane"];
const playersWhoScore = [
  "Dembele",
  "Zouma",
  "Dembele",
  "Arnautovic",
  "Gomez",
  "Gomez",
  "Dembele",
];

console.log(computeGameScore(team1, team2, playersWhoScore));
// -> "Team1 6 - 1 Team2"
