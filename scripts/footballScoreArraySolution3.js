//Solution 1
const computeGameState1 = (team1, team2, playersWhoScore) => {
  let scoreTeam1 = 0;
  let scoreTeam2 = 0;

  const isInTeam1 = (scorer) => {
    return team1.find((elt) => elt === scorer) !== undefined;
  };

  const isInTeam2 = (scorer) => {
    return team2.find((elt) => elt === scorer) !== undefined;
  };

  playersWhoScore.forEach((scorer) => {
    if (isInTeam1(scorer)) {
      scoreTeam1 += 1;
    } else if (isInTeam2(scorer)) {
      scoreTeam2 += 1;
    } else {
      console.log("scorer not found");
    }
  });

  return `Team1 ${scoreTeam1} - ${scoreTeam2} Team2`;
};

//Solution 2
const computeGameState2 = (team1, team2, playersWhoScore) => {
  let scoreTeam1 = [];
  let scoreTeam2 = [];
  let minutesGoals = [];

  const randomMinute = () => {
    return Math.floor(Math.random() * 90) + 1;
  };

  const isInTeam1 = (scorer) => {
    return team1.find((elt) => elt === scorer) !== undefined;
  };

  const isInTeam2 = (scorer) => {
    return team2.find((elt) => elt === scorer) !== undefined;
  };

  playersWhoScore.forEach(() => {
    minutesGoals.push(randomMinute());
  });

  minutesGoals.sort();

  playersWhoScore.forEach((scorer, index) => {
    if (isInTeam1(scorer)) {
      scoreTeam1.push({
        player: scorer,
        minute: minutesGoals[index],
      });
    } else if (isInTeam2(scorer)) {
      scoreTeam2.push({
        player: scorer,
        minute: minutesGoals[index],
      });
    } else {
      console.log("scorer not found");
    }
  });

  console.log({
    scoreTeam1,
    scoreTeam2,
  });
  return `Team1 ${scoreTeam1.length} - ${scoreTeam2.length} Team2`;
};
