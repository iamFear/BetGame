"use strict";

// HTML ELEMENTS
const redBtn = document.querySelector(".team-red-btn");
const betInput = document.querySelector(".bet-input");
const blur = document.querySelector(".blur");
const notifications = document.querySelector(".notifications");
const closeBtn = document.querySelector(".close-rules");

// FUNCTIONS

// CLOSE THE NOTIFICATIONS AND RETURN TO MAIN PAGE (PLAY GAME)
const closeNotifications = () => {
  blur.classList.remove("blur");
  notifications.classList.add("hidden");
};

// PRESS 'ESC' KEY TO CLOSE NOTIFICATIONS
document.addEventListener("keydown", function (e) {
  if (e.key === `Escape`) {
    console.log("pressed");
    closeNotifications();
  }
});

// PRESS THE CLOSE BUTTON TO CLOSE THE NOTIFICATIONS ELEMENT
closeBtn.addEventListener("click", closeNotifications);

// PREVENTS INPUT FIELD REFRESHING THE SITE AFTER CLICKING ENTER
betInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
  }
});
