"use strict";

const redBtn = document.querySelector(".team-red-btn");
const betInput = document.querySelector(".bet-input");

// PREVENTS INPUT FIELD REFRESHING THE SITE AFTER CLICKING ENTER
betInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
  }
});
