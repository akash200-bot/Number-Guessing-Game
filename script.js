let randomNumber = parseInt(Math.random() * 100 + 1);

const userInput = document.querySelector("#guessfield");
const submit = document.querySelector(".guesssubmit");
const guessSlot = document.querySelector(".guesses");
const remaining = document.querySelector(".lastresult");
const lowOrHigh = document.querySelector(".lowOrHigh");
const startOver = document.querySelector(".resultpara");

const p = document.createElement("p");

let pervGuess = [];
let numGuess = 1;

let playGame = true;

if (playGame) {
  submit.addEventListener("click", function (e) {
    e.preventDefault(); // this ill stop value to go in server or default setting of submit

    const guess = parseInt(userInput.value);
    validateGuess(guess);
  });
}
function validateGuess(guess) {
  if (isNaN(guess)) {
    alert("Please enter a valid number");
  } else if (guess < 1) {
    alert("Please enter a number more than 1");
  } else if (guess > 100) {
    alert("Please enter a number less than 100");
  } else {
    pervGuess.push(guess);
    if (numGuess === 10) {
      displayGuess(guess);
      displayMessage(`Game over, random number was ${randomNumber}`);
      lowOrHigh.style.color = "brown";
      endGame();
    } else {
      displayGuess(guess);
      checkGuess(guess);
    }
  }
}

function checkGuess(guess) {
  if (guess === randomNumber) {
    displayMessage(`You guessed it right`);
    lowOrHigh.style.color = "gold";
    endGame();
  } else if (guess < randomNumber) {
    displayMessage(` Numebr is TOOO low`);
    lowOrHigh.style.color = "lightgreen";
  } else if (guess > randomNumber) {
    displayMessage(` Numebr is TOOO high`);
    lowOrHigh.style.color = "lightyellow";
  }
}

function displayGuess(guess) {
  userInput.value = "";
  guessSlot.innerHTML += ` ${guess}, `;
  numGuess++;
  remaining.innerHTML = `${11 - numGuess}`;
}

function displayMessage(message) {
  lowOrHigh.innerHTML = `<h2>${message}</h2>`;
}

function endGame() {
  userInput.value = "";
  userInput.setAttribute("disabled", "");
  p.classList.add("button");
  p.innerHTML = `<h2 id="newGame">Start new Game </h2>`;
  startOver.appendChild(p);
  playGame = false;
  NewGame();
}

function NewGame() {
  const newGameButton = document.querySelector("#newGame");
  newGameButton.addEventListener("click", function (e) {
    randomNumber = parseInt(Math.random() * 100 + 1);
    pervGuess = [];
    numGuess = 1;
    guessSlot.innerHTML = "";
    remaining.innerHTML = `${11 - numGuess}`;
    userInput.removeAttribute("disabled");
    startOver.removeChild(p);
    playGame = true;
  });
}
