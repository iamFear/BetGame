"use strict";

// HTML ELEMENTS
const redBtn = document.querySelector(".team-red-btn");
const blueBtn = document.querySelector(".team-blue-btn");
const winBtn = document.querySelector(".win");
const loseBtn = document.querySelector(".lose");
const tieBtn = document.querySelector(".tie");
const closeBtn = document.querySelector(".close-rules");
const playBtn = document.querySelector(".play-game");
const playAgainBtn = document.querySelector(".play-again");
const betInput = document.querySelector(".bet-input");
const blur = document.querySelector(".blur");
const notifications = document.querySelector(".notifications");
const cashEl = document.querySelector(".cash");
const error = document.querySelector(".error");
const errorType = document.querySelector(".error-type");
const rulesEl = document.querySelector(".rules");
const resultsEl = document.querySelector(".results");
const betResultTeamEl = document.querySelector(".bet-input-team");
const betResultTypeEl = document.querySelector(".bet-input-type");
const betResultAmountEl = document.querySelector(".bet-input-amount");
const resultRedEl = document.querySelector(".result-red");
const resultBlueEl = document.querySelector(".result-blue");
const resultAmountEl = document.querySelector(".result-amount");
const typeResultEl = document.querySelector(".bet-result");
const betResultEl = document.querySelector(".bet-result-type");
const resultTotalAmount = document.querySelector(".total-result");
const cashTextResult = document.querySelector(".cash-text");
// FUNCTIONS:
// CLOSE THE NOTIFICATIONS AND RETURN TO MAIN PAGE (PLAY GAME)
const closeNotifications = () => {
  blur.classList.remove("blur");
  notifications.classList.add("hidden");
};

// OPEN THE NOTIFICATIONS ELEMENT
const openNotifications = () => {
  blur.classList.add("blur");
  notifications.classList.remove("hidden");
};

// RESTART THE VALUES OF THE GAME
const resetGame = () => {
  if (!resultsOpen) 1;

  team = undefined;
  type = undefined;
  redScore = undefined;
  blueScore = undefined;
  winner = undefined;
  totalBet = 0;
  resultsOpen = false;
  redBtn.classList.remove("selected");
  redBtn.classList.remove("rival");
  blueBtn.classList.remove("selected");
  blueBtn.classList.remove("rival");
  winBtn.classList.remove("selected");
  winBtn.classList.remove("rival");
  loseBtn.classList.remove("selected");
  loseBtn.classList.remove("rival");
  tieBtn.classList.remove("selected");
  tieBtn.classList.remove("rival");
  betInput.value = "";
};

// DISPLAY THE CURRENT AMOUNT OF CASH AVAILABLE IN THE ACCOUNT ON THE INTERFACE
const updateCash = () => {
  cashEl.textContent = cash;
};

// GENERATES A RANDOM NUMBER FROM 0 TO 5 (USE TO GENERATE TEAM SCORES)

const randomGenerator = () => {
  return Math.round(Math.random() * 5);
};

// VARIABLES
let cash = 100000;
let totalBet = 0;
// IF TEAM = 0 -> RED || BLUE = 1
let team = undefined;
let teamsContainer = ["RED", "BLUE"];
// IF TYPE = 0 -> WIN || 1 -> LOSE || 2 -> TIE
let type = undefined;
let typesContainer = ["Win", "Lose", "Tie"];
// OBJECT WITH THE LIST OF ERRORS (STRINGS)
let errors = {
  team: `team`,
  type: "type of bet",
  bet: `valid amount`,
};
// TEAM SCORES
let redScore = undefined;
let blueScore = undefined;

// WINNER (O === RED || 1 === BLUE || 2 === TIE)
let winner = undefined;

// TRACK IF THE RESULT ELEMENT IS OPEN
let resultsOpen = false;

// APPLICATION:

// PRESS 'ESC' KEY TO CLOSE NOTIFICATIONS
document.addEventListener("keydown", function (e) {
  if (e.key === `Escape`) {
    console.log("pressed");
    closeNotifications();
    updateCash();
    resetGame();
  }
});

// PRESS OUTSIDE OF THE RULES ELEMENT TO CLOSE THE NOTIFICATIONS
blur.addEventListener("click", closeNotifications);
blur.addEventListener("click", updateCash);
blur.addEventListener("click", resetGame);

// PRESS THE CLOSE BUTTON TO CLOSE THE NOTIFICATIONS ELEMENT
closeBtn.addEventListener("click", closeNotifications);
closeBtn.addEventListener("click", updateCash);
closeBtn.addEventListener("click", resetGame);

// PRESS THE 'PLAY AGAIN' BUTTON TO RETURN MAIN PAGE AND PLACE A NEW BET
playAgainBtn.addEventListener("click", closeNotifications);
playAgainBtn.addEventListener("click", updateCash);
playAgainBtn.addEventListener("click", resetGame);

// PREVENTS INPUT FIELD REFRESHING THE SITE AFTER CLICKING ENTER
betInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
  }
});

// TEAM SELECTION

// RED TEAM
redBtn.addEventListener("click", function () {
  redBtn.classList.add("selected");
  redBtn.classList.remove("rival");

  blueBtn.classList.remove("selected");
  blueBtn.classList.add("rival");
  team = 0;
});

// BLUE TEAM
blueBtn.addEventListener("click", function () {
  blueBtn.classList.add("selected");
  blueBtn.classList.remove("rival");

  redBtn.classList.remove("selected");
  redBtn.classList.add("rival");
  team = 1;
});

// BET SELECTION

// WIN BET
winBtn.addEventListener("click", function () {
  winBtn.classList.remove("rival");
  winBtn.classList.add("selected");

  loseBtn.classList.add("rival");
  loseBtn.classList.remove("selected");
  tieBtn.classList.add("rival");
  tieBtn.classList.remove("selected");
  type = 0;
});

// LOSE BET
loseBtn.addEventListener("click", function () {
  loseBtn.classList.remove("rival");
  loseBtn.classList.add("selected");

  winBtn.classList.add("rival");
  winBtn.classList.remove("selected");
  tieBtn.classList.add("rival");
  tieBtn.classList.remove("selected");
  type = 1;
});

// TIE BET
tieBtn.addEventListener("click", function () {
  tieBtn.classList.remove("rival");
  tieBtn.classList.add("selected");

  winBtn.classList.add("rival");
  winBtn.classList.remove("selected");
  loseBtn.classList.add("rival");
  loseBtn.classList.remove("selected");
  type = 2;
});

// GET BET INPUT FROM THE USER / GAME FUNCTIONALITY (MATCH CALCULATIONS)
playBtn.addEventListener("click", function () {
  // CHECK IF USER SELECTED A TEAM
  if (team != 0 && team != 1 && type != 2) {
    error.classList.remove("hidden");
    errorType.textContent = errors.team;
    return 1;
  }

  // VALIDATE AND CHECK IF USER SELECTED A BET
  const validateType = type >= 0 && type <= 3;

  // IF FALSE, DISPLAY ERROR MESSAGE
  if (!validateType) {
    error.classList.remove("hidden");
    errorType.textContent = errors.type;
    return 1;
  }
  // VALIDATE AND CHECK USER BET AMOUNT INPUT

  // STORE THE BET INPUT FROM THE USER
  totalBet = betInput.value;
  // TRANSFORM THE INPUT IT INTO A STRING
  let betTransform = Number(totalBet);

  // CHECK IF TRANSFORMED INPUT BET IS A POSITIVE INTEGER
  let integer = Number.isInteger(betTransform);

  if (!integer || betTransform <= 0) {
    error.classList.remove("hidden");
    errorType.textContent = errors.bet;
    return 1;
  }

  // CHECK IF TOTAL BET IS AVAILABLE IN CASH
  if (betTransform > cash) {
    error.classList.remove("hidden");
    errorType.textContent = errors.bet;
    return 1;
  }

  // GAME FUNCTIONALITY
  resultsOpen = true;
  error.classList.add("hidden");
  rulesEl.classList.add("hidden");
  resultsEl.classList.remove("hidden");

  // GENERATE THE SCORES FOR THE TEAMS AND DISPLAY THEM
  redScore = randomGenerator();
  blueScore = randomGenerator();

  resultRedEl.textContent = redScore;
  resultBlueEl.textContent = blueScore;

  // DEFINE THE RESULT OF THE MATCH

  // CHECK WINNER TEAM
  if (redScore > blueScore) {
    winner = 0; // RED
  } else if (redScore < blueScore) {
    winner = 1; // BLUE
  } else {
    winner = 2; // TIE
  }

  // CHECK IF BET WAS WON OR LOSED (TODO: ADD FUNCTIONALITY TO EACH CASE)
  if (winner === team && type === 0 && winner != 2) {
    // WON THE BET (WIN);
    const addCash = betTransform * 2;
    cash += addCash;
    betResultEl.classList.remove("red");
    betResultEl.classList.add("green");
    cashTextResult.classList.remove("red");
    cashTextResult.classList.add("green");
    typeResultEl.textContent = "won";
    resultAmountEl.textContent = addCash;
    resultTotalAmount.textContent = cash;
    cashEl.textContent = cash;
  } else if (winner != team && type === 1 && winner != 2) {
    // WON THE BET (LOSE)
    const addCash = betTransform * 2;
    cash += addCash;
    betResultEl.classList.remove("red");
    betResultEl.classList.add("green");
    cashTextResult.classList.remove("red");
    cashTextResult.classList.add("green");
    typeResultEl.textContent = "won";
    resultAmountEl.textContent = addCash;
    resultTotalAmount.textContent = cash;
    cashEl.textContent = cash;
  } else if (winner === 2 && type === 2) {
    // WON THE BET (TIE)
    const addCash = betTransform * 2;
    cash += addCash;
    betResultEl.classList.remove("red");
    betResultEl.classList.add("green");
    cashTextResult.classList.remove("red");
    cashTextResult.classList.add("green");
    typeResultEl.textContent = "won";
    resultAmountEl.textContent = addCash;
    resultTotalAmount.textContent = cash;
    cashEl.textContent = cash;
  } else {
    // LOSE THE BET
    const subtractCash = betTransform / 2;
    cash -= subtractCash;
    betResultEl.classList.remove("green");
    betResultEl.classList.add("red");
    cashTextResult.classList.remove("green");
    cashTextResult.classList.add("red");
    typeResultEl.textContent = "losed";
    resultAmountEl.textContent = subtractCash;
    resultTotalAmount.textContent = cash;
    cashEl.textContent = cash;
    console.log(`You losed the bet`);
  }

  betResultTeamEl.textContent = teamsContainer[team];

  if (team === 0) {
    betResultTeamEl.classList.remove("blue");
    betResultTeamEl.classList.add("red");
  } else {
    betResultTeamEl.classList.remove("red");
    betResultTeamEl.classList.add("blue");
  }

  betResultTypeEl.textContent = typesContainer[type];

  if (type === 0) {
    betResultTypeEl.classList.remove("lose-color");
    betResultTypeEl.classList.remove("tie-color");
    betResultTypeEl.classList.add("win-color");
  } else if (type === 1) {
    betResultTypeEl.classList.remove("tie-color");
    betResultTypeEl.classList.remove("win-color");
    betResultTypeEl.classList.add("lose-color");
  } else {
    betResultTypeEl.classList.remove("win-color");
    betResultTypeEl.classList.remove("lose-color");
    betResultTypeEl.classList.add("tie-color");
  }

  betResultAmountEl.textContent = betTransform;

  openNotifications();

  console.log(teamsContainer[team]);
  console.log(typesContainer[type], type);
  console.log(betTransform);
  console.log(`function end`);
});
