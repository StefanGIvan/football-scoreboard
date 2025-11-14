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

  scoreString(scoreTeam1, scoreTeam2) {
    return `${scoreTeam1} - ${scoreTeam2}`;
  }
  // method that checks if minute is a string for normal time & extra time
  // if that minute is part of first half
  isMinuteFirstHalf(minute) {
    if (typeof minute === "string") {
      if (minute.startsWith("45+")) {
        return true;
      }

      const typeNumber = Number(minute);
      return (
        Number.isInteger(typeNumber) && typeNumber >= 0 && typeNumber <= 45
      );
    }

    return false;
  }

  // get the score for both teams at first halftime (extra time included)
  getFirstHalfScore() {
    let team1HalftimeScore = 0;
    let team2HalftimeScore = 0;

    // loop through the team1 players who scored
    for (const playerName in this.team1Goals) {
      const minuteGoal = this.team1Goals[playerName].minute;
      for (const minute of minuteGoal) {
        if (this.isMinuteFirstHalf(minute)) {
          team1HalftimeScore++;
        }
      }
    }

    // loop through the team2 players who scored
    for (const playerName in this.team2Goals) {
      const minuteGoal = this.team2Goals[playerName].minute;
      for (const minute of minuteGoal) {
        if (this.isMinuteFirstHalf(minute)) {
          team2HalftimeScore++;
        }
      }
    }

    // return the result
    return `${this.team1.name} ${this.scoreString(
      team1HalftimeScore,
      team2HalftimeScore
    )} ${this.team2.name}`;
  }

  // method that checks if minute is a string for normal time & extra time
  // if that minute is part of second half
  isMinuteSecondHalf(minute) {
    if (typeof minute === "string") {
      if (minute.startsWith("90+")) return true;

      const typeNumber = Number(minute);
      return (
        Number.isInteger(typeNumber) && typeNumber >= 46 && typeNumber <= 90
      );
    }

    return false;
  }

  // get the score for both teams at second halftime (extra time included)
  getSecondHalfScore() {
    let team1SecondHalfScore = 0;
    let team2SecondHalfScore = 0;

    // loop through the team1 players who scored
    for (const playerName in this.team1Goals) {
      const minuteGoal = this.team1Goals[playerName].minute;
      for (const minute of minuteGoal) {
        if (this.isMinuteSecondHalf(minute)) {
          team1SecondHalfScore++;
        }
      }
    }

    // loop through the team2 players who scored
    for (const playerName in this.team2Goals) {
      const minuteGoal = this.team2Goals[playerName].minute;
      for (const minute of minuteGoal) {
        if (this.isMinuteSecondHalf(minute)) {
          team2SecondHalfScore++;
        }
      }
    }

    // return the result
    return `${this.team1.name} ${this.scoreString(
      team1SecondHalfScore,
      team2SecondHalfScore
    )} ${this.team2.name}`;
  }

  // method to help with sorting strings
  parseMinute(minute) {
    // case for extra time
    if (minute.includes("+")) {
      // used destructuring to attribute for example: 45 and 2 (string)
      const [base, added] = minute.split("+").map(Number);
      return base + added / 10;
    }

    const typeNumber = Number(minute);
    return typeNumber;
  }

  // get the minutes in chronological order (sorts the goals of the whole match)
  // make a new array to sort
  getTimeline() {
    const timeline = [];

    // ensure per-player minutes are sorted
    this.sortGoals();

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
    timeline.sort(
      (a, b) => this.parseMinute(a.minute) - this.parseMinute(b.minute)
    );

    return timeline;
  }

  // sorts the minutes inside team1Goals/team2Goals for a player
  sortGoals() {
    Object.values(this.team1Goals).forEach((goal) =>
      goal.minute.sort((a, b) => this.parseMinute(a) - this.parseMinute(b))
    );
    Object.values(this.team2Goals).forEach((goal) =>
      goal.minute.sort((a, b) => this.parseMinute(a) - this.parseMinute(b))
    );
  }

  // method to get team goals chronologically (player, minute, team)
  getTeamGoals(teamNumber) {
    const goals = [];
    const teamGoals = teamNumber === 1 ? this.team1Goals : this.team2Goals;
    const teamName = teamNumber === 1 ? this.team1.name : this.team2.name;

    // ensure per-player minutes are sorted
    this.sortGoals();

    for (const player in teamGoals) {
      const minuteGoal = teamGoals[player].minute;

      minuteGoal.forEach((minute) => {
        goals.push({ player, minute, team: teamName });
      });
    }

    goals.sort(
      (a, b) => this.parseMinute(a.minute) - this.parseMinute(b.minute)
    );

    return goals;
  }

  // create an object for a player with the minutes when he scorede, without deduplicating the object
  addGoal({ playerName, goalMinute }) {
    //check the player name
    if (typeof playerName !== "string" || playerName.trim() === "") {
      console.error(
        "Invalid player name provided/no player name provided: ",
        playerName
      );

      return;
    }

    // validate the minute (goalMinute) for strings
    if (typeof goalMinute !== "string") {
      console.error("goalMinute must be a string: ", goalMinute);
      return;
    }

    const isValidMinute =
      this.isMinuteFirstHalf(goalMinute) || this.isMinuteSecondHalf(goalMinute);

    if (!isValidMinute) {
      console.error("Invalid minute: ", goalMinute);
      return;
    }

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
      console.log("Player not found: ", playerName);
    }

    // ensure per-player minutes are sorted
    this.sortGoals();
  }

  // return the score
  getScore() {
    return `${this.team1.name} ${this.scoreString(
      this.team1Score,
      this.team2Score
    )} ${this.team2.name}`;
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
match.addGoal({ playerName: "Saka", goalMinute: 23 });
match.addGoal({ playerName: "Saka", goalMinute: 0 }); // first minute
match.addGoal({ playerName: "Saka", goalMinute: "45+2" }); // first half extra
match.addGoal({ playerName: "Rashford", goalMinute: 50 }); // second half
match.addGoal({ playerName: "Bruno Fernandes", goalMinute: "90+3" }); // second half extra

match.getScore();
match.getFirstHalfScore();
match.getSecondHalfScore();
match.getTimeline();

const arsenalGoals = match.getTeamGoals(1); // get goals for the first team
const unitedGoals = match.getTeamGoals(2); // get goals for the second team
