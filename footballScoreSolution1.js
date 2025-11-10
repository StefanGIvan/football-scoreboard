function computeGameScore(team1, team2, playersWhoScore) {
  let scoreIndex;
  let team1Index;
  let team2Index;
  let team1Score = 0;
  let team2Score = 0;

  for (scoreIndex = 0; scoreIndex <= playersWhoScore.length - 1; scoreIndex++) {
    for (team1Index = 0; team1Index <= team1.length - 1; team1Index++) {
      if (playersWhoScore[scoreIndex] === team1[team1Index]) {
        team1Score++;
        break;
      }
    }

    for (team2Index = 0; team2Index <= team2.length - 1; team2Index++) {
      if (playersWhoScore[scoreIndex] === team2[team2Index]) {
        team2Score++;
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

//output: Team1 X - Y team2
