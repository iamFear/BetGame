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
  if (team != 0 && team != 1) {
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

  // TODO IMPLEMENT GAME FUNCTIONALITY

  resultsOpen = true;
  error.classList.add("hidden");
  rulesEl.classList.add("hidden");
  resultsEl.classList.remove("hidden");

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
  console.log(typesContainer[type]);
  console.log(betTransform);
  console.log(`function end`);
});
