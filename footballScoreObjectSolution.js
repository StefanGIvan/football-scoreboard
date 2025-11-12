const computeGameState = (team1, team2, playersWhoScore) => {
  let scoreTeam1 = [];
  let scoreTeam2 = [];
  let minutesGoals = [];
  let team1Goals = 0;
  let team2Goals = 0;

  const randomMinute = () => Math.floor(Math.random() * 90) + 1;

  const isInTeam1 = (scorer) => {
    return team1.players.includes(scorer);
  };

  const isInTeam2 = (scorer) => {
    return team2.players.includes(scorer);
  };

  // generate random minutes
  playersWhoScore.forEach(() => {
    minutesGoals.push(randomMinute());
  });

  // sort minutes ascending
  minutesGoals.sort((a, b) => a - b);

  // define 2 objects for each team that keep track if a player has already scored
  let team1Map = {};
  let team2Map = {};

  // assign sorted minutes to scorers chronologically
  playersWhoScore.forEach((scorer, index) => {
    const minuteScored = minutesGoals[index];

    if (isInTeam1(scorer)) {
      if (!team1Map[scorer]) {
        team1Map[scorer] = { minute: [] };
        scoreTeam1.push(team1Map[scorer]);
      }
      // if he's already in the array, means he scored again, so we need to push the minute he scored again
      team1Map[scorer].minute.push(minuteScored);
      team1Goals += 1;
    } else if (isInTeam2(scorer)) {
      if (!team2Map[scorer]) {
        team2Map[scorer] = { minute: [] };
        scoreTeam2.push(team2Map[scorer]);
      }
      // if he's already in the array, means he scored again, so we need to push the minute he scored again
      team2Map[scorer].minute.push(minuteScored);
      team2Goals += 1;
    } else {
      console.error("Scorer not found: ", scorer);
    }
  });

  console.log("team1Map:", team1Map);
  console.log("team2Map:", team2Map);

  // Final scoreboard string
  return `${team1.name} ${team1Goals} - ${team2Goals} ${team2.name}`;
};

const team1 = {
  name: "Arsenal",
  players: [
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
  ],
};

const team2 = {
  name: "Manchester United",
  players: [
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
  ],
};

const playersWhoScore = ["Saliba", "Bruno Fernandes", "Antony", "Saka", "Saka"];

console.log(computeGameState(team1, team2, playersWhoScore));
