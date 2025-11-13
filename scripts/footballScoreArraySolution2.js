function computeGameScore(team1, team2, playersWhoScore) {
  let team1Score = 0;
  let team2Score = 0;
  let uniquePlayers = []; // can log all the players that participated
  let playerGoalsCounter = []; // can log how many goals a player scored
  let teamOfPlayer = []; // can log from which team a player is from
  let minuteOfGoal = [];
  let team1ScoredList = [];
  let team2ScoredList = [];

  const teamByPlayer = {};

  // fill the uniquePlayers array from team1
  for (let team1Index = 0; team1Index < team1.length; team1Index++) {
    uniquePlayers.push(team1[team1Index]);
    playerGoalsCounter.push(0);
    teamOfPlayer.push(1);
  }

  // fill the uniquePlayers array from team2
  for (let team2Index = 0; team2Index < team2.length; team2Index++) {
    uniquePlayers.push(team2[team2Index]);
    playerGoalsCounter.push(0);
    teamOfPlayer.push(2);
  }

  // go through the playersWhoScore array
  for (let scoreIndex = 0; scoreIndex < playersWhoScore.length; scoreIndex++) {
    let scoredPlayer = playersWhoScore[scoreIndex];
    minuteOfGoal[scoreIndex] = randomMinute(); // assign a minute for the player who scored

    // go through the uniquePlayers array and in this way, add a player just once (to not iterate through 2 teams arrays)
    // have a playerGoalsCounter array to know how many times a player scored
    // a player can't be in both teams, because we can't determine that from the playersWhoScore array
    // we know how many times a player has scored (array version)
    for (
      let uniquePlayersIndex = 0;
      uniquePlayersIndex < uniquePlayers.length;
      uniquePlayersIndex++
    ) {
      // the player already scored once
      if (uniquePlayers[uniquePlayersIndex] === scoredPlayer) {
        playerGoalsCounter[uniquePlayersIndex]++; // if we find the player, add a goal into the playerGoalsCounter array

        const goalScored = {
          player: scoredPlayer,
          minute: minuteOfGoal[scoreIndex],
        };
        // we determine from which team that player is from and add a goal for that team
        if (teamOfPlayer[uniquePlayersIndex] === 1) {
          team1Score++;
          team1ScoredList.push(goalScored);
        } else {
          team2Score++;
          team2ScoredList.push(goalScored);
        }

        break;
      }
    }
  }

  //sort the minutes of the players
  team1ScoredList.sort((a, b) => a.minute - b.minute);
  team2ScoredList.sort((a, b) => a.minute - b.minute);

  return {
    team1Score,
    team2Score,
    team1ScoredList,
    team2ScoredList,
  };
}

function randomMinute() {
  return Math.floor(Math.random() * 90) + 1;
}

const team1 = [
  "Raya",
  "White",
  "Saliba",
  "Gabriel",
  "Zinchenko",
  "Rice",
  "Ødegaard",
  "Partey",
  "Saka",
  "Martinelli",
  "Jesus",
];

const team2 = [
  "Onana",
  "Dalot",
  "Varane",
  "Martinez",
  "Shaw",
  "Casemiro",
  "Bruno Fernandes",
  "Eriksen",
  "Antony",
  "Rashford",
  "Højlund",
];

const playersWhoScore = ["Saliba", "Bruno Fernandes", "Antony", "Saka", "Saka"];

const resultOfTable = computeGameScore(team1, team2, playersWhoScore);

// inject scoreboard score
document.querySelector(".team1-score").textContent = resultOfTable.team1Score;
document.querySelector(".team2-score").textContent = resultOfTable.team2Score;

const team1ScorersUl = document.querySelector(".scorers-left");
const team2ScorersUl = document.querySelector(".scorers-right");

for (
  team1ListIndex = 0;
  team1ListIndex < resultOfTable.team1ScoredList.length;
  team1ListIndex++
) {
  const goal = resultOfTable.team1ScoredList[team1ListIndex];
  const scorerLi = document.createElement("li");
  scorerLi.className = "scorers-left-list";
  scorerLi.textContent = `${goal.player} ⚽ ${goal.minute}'`;
  team1ScorersUl.appendChild(scorerLi);
}

for (
  team2ListIndex = 0;
  team2ListIndex < resultOfTable.team2ScoredList.length;
  team2ListIndex++
) {
  const goal = resultOfTable.team2ScoredList[team2ListIndex];
  const scorerLi = document.createElement("li");
  scorerLi.className = "scorers-right-list";
  scorerLi.textContent = `${goal.player} ⚽ ${goal.minute}'`;
  team2ScorersUl.appendChild(scorerLi);
}
