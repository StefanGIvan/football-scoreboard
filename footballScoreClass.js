class Match {
  constructor(team1, team2, additionalInformations) {
    this.team1 = {
      players: team1.players,
      coach: team1.coach,
    };

    this.team2 = {
      players: team2.players,
      coach: team2.coach,
    };

    this.additionalInformations = additionalInformations;
  }
}

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
