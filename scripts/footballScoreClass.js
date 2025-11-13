class Match {
  constructor(team1, team2, additionalInformations) {
    // save team1 structure
    this.team1 = {
      name: team1.name,
      players: team1.players,
      coach: team1.coach,
    };

    // save team2 structure
    this.team2 = {
      name: team2.name,
      players: team2.players,
      coach: team2.coach,
    };

    this.additionalInformations = additionalInformations;

    // objects: player name (key), minute = [] (value)
    this.team1Goals = {};
    this.team2Goals = {};

    // total goals for each team
    this.team1Score = 0;
    this.team2Score = 0;
  }

  // generate a random minute a player has scored for the match
  randomMinute() {
    return Math.floor(Math.random() * 95) + 1;
  }

  // get the score for both teams at first halftime
  // count the goals until the 48' minute
  getFirstHalfScore() {
    let team1HalftimeScore = 0;
    let team2HalftimeScore = 0;

    // loop through the team1 players who scored
    for (const playerName in this.team1Goals) {
      const minuteGoal = this.team1Goals[playerName].minute;
      for (const minute of minuteGoal) {
        if (minute <= 48) {
          team1HalftimeScore++;
        }
      }
    }

    // loop through the team2 players who scored
    for (const playerName in this.team2Goals) {
      const minuteGoal = this.team2Goals[playerName].minute;
      for (const minute of minuteGoal) {
        if (minute <= 48) {
          team2HalftimeScore++;
        }
      }
    }

    // return the result
    return `${this.team1.name} ${team1HalftimeScore} - ${this.team2.name} ${team2HalftimeScore}`;
  }

  // get the score for both teams at second halftime
  // count the goals until the 95' minute
  getSecondHalfScore() {
    let team1SecondHalfScore = 0;
    let team2SecondHalfScore = 0;

    // loop through the team1 players who scored
    for (const playerName in this.team1Goals) {
      const minuteGoal = this.team1Goals[playerName].minute;
      for (const minute of minuteGoal) {
        if (minute <= 95) {
          team1SecondHalfScore++;
        }
      }
    }

    // loop through the team2 players who scored
    for (const playerName in this.team2Goals) {
      const minuteGoal = this.team2Goals[playerName].minute;
      for (const minute of minuteGoal) {
        if (minute <= 95) {
          team2SecondHalfScore++;
        }
      }
    }

    // return the result
    return `${this.team1.name} ${team1SecondHalfScore} - ${this.team2.name} ${team2SecondHalfScore}`;
  }

  // minutes are stored the same
  // format the extra time minutes to be displayed differently
  formatMinute(minute) {
    if (minute > 45 && minute <= 48) {
      return `45 + ${minute - 45}`;
    }

    if (minute > 90 && minute <= 95) {
      return `90 + ${minute - 90}`;
    }

    // default for normal minutes
    return minute;
  }

  // get the minutes in chronological order (sorts the goals of the whole match)
  // make a new array to sort
  getTimeline() {
    const timeline = [];

    // loop through each team1 player who scored
    for (const player in this.team1Goals) {
      const minutes = this.team1Goals[player].minute;

      // for each minute, create a new object with the player, minute, and team of that player
      minutes.forEach((minute) => {
        timeline.push({ player, minute: minute, team: this.team1.name });
      });
    }

    // loop through each team2 player who scored
    for (const player in this.team2Goals) {
      const minutes = this.team2Goals[player].minute;

      // for each minute, create a new object with the player, minute, and team of that player
      minutes.forEach((minute) => {
        timeline.push({ player, minute: minute, team: this.team2.name });
      });
    }

    // finally, sort the array for minutes
    timeline.sort((a, b) => a.minute - b.minute);

    return timeline;
  }

  // sorts the minutes inside team1Goals/team2Goals for a player
  sortGoals() {
    Object.values(this.team1Goals).forEach((goal) =>
      goal.minute.sort((a, b) => a - b)
    );
    Object.values(this.team2Goals).forEach((goal) =>
      goal.minute.sort((a, b) => a - b)
    );
  }

  // create an object for a player with the minutes when he scorede, without deduplicating the object
  addGoal({ playerName, minute }) {
    // assign a random minute if minute is false
    const goalMinute = minute ?? this.randomMinute();

    if (this.team1.players.includes(playerName)) {
      // if that player didn't score already
      if (!this.team1Goals[playerName]) {
        this.team1Goals[playerName] = { minute: [] };
      }

      this.team1Goals[playerName].minute.push(goalMinute);
      this.team1Score++;
    } else if (this.team2.players.includes(playerName)) {
      // if that player didn't score already
      if (!this.team2Goals[playerName]) {
        this.team2Goals[playerName] = { minute: [] };
      }

      this.team2Goals[playerName].minute.push(goalMinute);
      this.team2Score++;
    } else {
      console.error("Player not found: ", playerName);
    }
  }

  // display the score
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
