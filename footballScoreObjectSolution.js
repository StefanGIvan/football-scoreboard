const computeGameState = (team1, team2, playersWhoScore) => {
  let scoreTeam1 = [];
  let scoreTeam2 = [];
  let minutesGoals = [];

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

  // assign sorted minutes to scorers chronologically
  playersWhoScore.forEach((scorer, index) => {
    const goalData = { player: scorer, minute: minutesGoals[index] };

    if (isInTeam1(scorer)) {
      scoreTeam1.push(goalData);
    } else if (isInTeam2(scorer)) {
      scoreTeam2.push(goalData);
    } else {
      console.error("Scorer not found:", scorer);
    }
  });

  // Final scoreboard string
  return `${team1.name} ${scoreTeam1.length} - ${scoreTeam2.length} ${team2.name}`;
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
