"use strict";

// HTML ELEMENTS
const redBtn = document.querySelector(".team-red-btn");
const blueBtn = document.querySelector(".team-blue-btn");
const winBtn = document.querySelector(".win");
const loseBtn = document.querySelector(".lose");
const tieBtn = document.querySelector(".tie");
const closeBtn = document.querySelector(".close-rules");
const playBtn = document.querySelector(".play");
const betInput = document.querySelector(".bet-input");
const blur = document.querySelector(".blur");
const notifications = document.querySelector(".notifications");
const cashEl = document.querySelector(".cash");
const error = document.querySelector(".error");
const errorType = document.querySelector(".error-type");

// FUNCTIONS:
// CLOSE THE NOTIFICATIONS AND RETURN TO MAIN PAGE (PLAY GAME)
const closeNotifications = () => {
  blur.classList.remove("blur");
  notifications.classList.add("hidden");
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
// IF TYPE = 0 -> WIN || 1 -> LOSE || 2 -> TIE
let type = undefined;
// OBJECT WITH THE LIST OF ERRORS (STRINGS)
let errors = {
  team: `team`,
  type: "type of bet",
  bet: `valid amount`,
};

// APPLICATION:

// PRESS 'ESC' KEY TO CLOSE NOTIFICATIONS
document.addEventListener("keydown", function (e) {
  if (e.key === `Escape`) {
    console.log("pressed");
    closeNotifications();
    updateCash();
  }
});

// PRESS OUTSIDE OF THE RULES ELEMENT TO CLOSE THE NOTIFICATIONS
blur.addEventListener("click", closeNotifications);
blur.addEventListener("click", updateCash);

// PRESS THE CLOSE BUTTON TO CLOSE THE NOTIFICATIONS ELEMENT
closeBtn.addEventListener("click", closeNotifications);
closeBtn.addEventListener("click", updateCash);

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
  }

  // CHECK IF TOTAL BET IS AVAILABLE IN CASH
  if (totalBet > cash) {
    error.classList.remove("hidden");
    errorType.textContent = errors.bet;
  }

  // TODO IMPLEMENT GAME FUNCTIONALITY

  console.log(`function end`);
});
