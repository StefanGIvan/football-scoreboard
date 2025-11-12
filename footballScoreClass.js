class Match {
  constructor(team1, team2, additionalInformations) {
    this.team1 = {
      name: team1.name,
      players: team1.players,
      coach: team1.coach,
    };

    this.team2 = {
      name: team2.name,
      players: team2.players,
      coach: team2.coach,
    };

    this.additionalInformations = additionalInformations;

    this.team1Goals = {};
    this.team2Goals = {};

    this.team1Score = 0;
    this.team2Score = 0;
  }

  // for future use
  randomMinute() {
    return Math.floor(Math.random() * 90) + 1;
  }

  // for future use
  sortGoals() {
    Object.values(this.team1Goals).forEach((goal) =>
      goal.minute.sort((a, b) => a - b)
    );
    Object.values(this.team2Goals).forEach((goal) =>
      goal.minute.sort((a, b) => a - b)
    );
  }

  addGoal({ playerName, minute }) {
    if (this.team1.players.includes(playerName)) {
      // if that player didn't score already
      if (!this.team1Goals[playerName]) {
        this.team1Goals[playerName] = { minute: [] };
      }

      this.team1Goals[playerName].minute.push(minute);
      this.team1Score++;
    } else if (this.team2.players.includes(playerName)) {
      // if that player didn't score already
      if (!this.team2Goals[playerName]) {
        this.team2Goals[playerName] = { minute: [] };
      }

      this.team2Goals[playerName].minute.push(minute);
      this.team2Score++;
    } else {
      console.error("Player not found: ", playerName);
    }
  }

  getScore() {
    return `${this.team1.name} ${this.team1Score} - ${this.team2Score} ${this.team2.name}`;
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
  coach: "Arteta",
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
  coach: "Amorim",
};

const match = new Match(team1, team2, additionalInformations);
match.addGoal({ player: "Saka", minute: 23 });
match.getScore();
