/* 
  Name: Yousif Adel
  Description: This is the JavaScript for the game
*/

const gameName = "Guess The Word Game";

// Add Title to the page with the game name
document.title = gameName;

// Add Heading of the page by the game name
document.querySelector("h1").innerHTML = gameName;

// Add The Author & game name to the Footer
document.querySelector(
  "footer"
).innerHTML = `${gameName} Created By Yousif Adel`;

// Settings Of The Game
const numberOfTries = 6,
  numberOfLetters = 6;
let currentTry = 1;
let numberOfHints = 2;

// Game words
const words = [
  "Create",
  "Update",
  "Delete",
  "Master",
  "Branch",
  "Mainly",
  "School",
];
let wordToGuess = "";
wordToGuess = words[Math.floor(words.length * Math.random())].toLowerCase();

let messageArea = document.querySelector(".message");
document.querySelector(".hint span").innerHTML = `${numberOfHints}`;
const getHintButton = document.querySelector(".hint");
getHintButton.addEventListener("click", getHint);

const restartButton = document.querySelector(".restart");
restartButton.addEventListener("click", restartGame);

/*
    Function Description:
        - responsible to create divs (same as number of number of tries) & add class  
        - add in each div inputs (same as number of number of letters)  
        - when the page is loaded focus on first input
*/
function generateInputs() {
  const inputsContainer = document.querySelector(".inputs");

  // Here We creating number of divs as number of tries
  for (let i = 1; i <= numberOfTries; i++) {
    // Create the div
    const tryDiv = document.createElement("div");

    // Add try class for the div
    tryDiv.classList.add(`try-${i}`);

    // Add Span on each created div to display the [try number] to user
    tryDiv.innerHTML = `<span>Try ${i}</span>`;

    // Add Disabled inputs class to any try div not first
    if (i != 1) tryDiv.classList.add("disabled-inputs");

    // Here We added in each div inputs (same as number of number of letters)
    for (let j = 1; j <= numberOfLetters; j++) {
      // Create the input
      const input = document.createElement("input");

      // Make the type of the input (text)
      input.type = "text";

      // Add try class to the input (letter)
      input.id = `guess-${i}-letter-${j}`;

      // Make the maximum length for the input is 1 because we only allowed to add one letter
      input.setAttribute("maxLength", 1);

      // Append the input to inputs div
      tryDiv.appendChild(input);
    }

    // Append the div to inputs body
    inputsContainer.appendChild(tryDiv);
  }

  //   After Creating all the elements we want to focus on the first input in the page
  inputsContainer.children[0].children[1].focus();

  /* Disable All Inputs except first div at first */
  const inputsDisabledDivs = document.querySelectorAll(
    ".disabled-inputs input"
  );
  inputsDisabledDivs.forEach((inp) => (inp.disabled = true)); // looped on all inputs to disable it

  const allInputs = document.querySelectorAll("input");
  allInputs.forEach((input, index) => {
    // Convert the input to uppercase using add listener
    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase();

      const nextInput = allInputs[index + 1];
      if (nextInput) nextInput.focus();
    });

    // if the user press arrow right then go to next input
    input.addEventListener("keydown", function (event) {
      const currentIndex = Array.from(allInputs).indexOf(event.target); // OR this
      // if the user press arrow right the cursor goes to next input if there
      if (event.key === "ArrowRight") {
        const nextInputIndex = currentIndex + 1;
        if (nextInputIndex < allInputs.length)
          allInputs[nextInputIndex].focus();
      }

      // if the user press arrow left the cursor goes back to previous  input if there
      if (event.key === "ArrowLeft") {
        const prevInputIndex = currentIndex - 1;
        if (prevInputIndex >= allInputs.length)
          allInputs[prevInputIndex].focus();
      }
    });
  });
}

const guessButton = document.querySelector(".check");
guessButton.addEventListener("click", handleGuesses);
console.log(wordToGuess);

/*
    Function Description:
        - responsible to set id for each letter in each div
        - convert the letter to lowercase to check it with the letter in the word to guess
          - if the letter is correct and in its place then set its class named in-place  & keep the boolean value to true [means that the guess is correct in until now]
          - if the letter is correct but not in its place then set other class named not-in-place & change the boolean value to false [means that the guess is wrong]
          - if the letter is wrong set the class 'wrong'  & change the boolean value to false [means that the guess is wrong]
        - disable the check button & hint button after the winning case [Win Case]
        - if the user eneterd wrong word & the beginning then the first became disabled & go to the next try until all tries finished then disable all buttons [Lose Case]
*/
function handleGuesses() {
  let sucessGuess = true;
  for (let i = 1; i <= numberOfLetters; i++) {
    const inputField = document.querySelector(
      `#guess-${currentTry}-letter-${i}`
    );
    const letter = inputField.value.toLowerCase();
    const actualLetter = wordToGuess[i - 1];
    if (letter === actualLetter) {
      inputField.classList.add("in-place");
    } else if (wordToGuess.includes(letter) && letter != "") {
      sucessGuess = false;
      inputField.classList.add("not-in-place");
    } else {
      sucessGuess = false;
      inputField.classList.add("wrong");
    }
  }

  if (sucessGuess) {
    // messageArea.innerHTML = `You Win After <span>${currentTry} Tries</span>`;
    messageArea.innerHTML = `You Win The Word Is <span>${wordToGuess}</span>`;

    // Add disable class on all try divs
    let allTriesDivs = document.querySelectorAll(".inputs > div");
    allTriesDivs.forEach((trydiv) => trydiv.classList.add("disabled-inputs"));

    // disable guess button
    guessButton.disabled = true;

    // disable hint button
    getHintButton.disabled = true;
  } else {
    // add disabled-inpus class to the div that the user enterd wrong answer
    document
      .querySelector(`.try-${currentTry}`)
      .classList.add("disabled-inputs");
    // make all the inputs of this wrong div (DISABLED)
    const currentTryInputs = document.querySelectorAll(
      `.try-${currentTry} input`
    );
    currentTryInputs.forEach((input) => (input.disabled = true));

    currentTry++; // Go for Next Try
    let el = document.querySelector(`.try-${currentTry}`);
    // Check if the element is there by checking if the number of divs still there
    if (el) {
      // Remove class disabled from the next try (new try) & make all its inputs enabled
      document
        .querySelector(`.try-${currentTry}`)
        .classList.remove("disabled-inputs");
      const nextTryIinputs = document.querySelectorAll(
        `.try-${currentTry} input`
      );
      nextTryIinputs.forEach((input) => (input.disabled = false));
      el.children[1].focus();
    } else {
      // Disable the button because the number of tries
      guessButton.disabled = true;
      messageArea.innerHTML = `You Lose The Word Is <span>${wordToGuess}</span>`;
    }
  }
}

/*
    Function Description:
        - responsible to reduce number of hints after the user click 
          the button then give the user randomly hint of the word
*/
function getHint() {
  if (numberOfHints > 0) {
    numberOfHints--;
    document.querySelector(".hint span").innerHTML = numberOfHints;
  }
  if (numberOfHints === 0) {
    getHintButton.disabled = true;
  }

  // get all inputs that don't have disabled attribute
  const enabledInputs = document.querySelectorAll("input:not([disabled])");
  // get all empty inputs that also don't have disabled attribute
  const emptyEnabledInputs = Array.from(enabledInputs).filter(
    (input) => input.value === ""
  );

  if (emptyEnabledInputs.length === 0) return;

  // randomly get index of this inputs
  const randomIndex = Math.floor(emptyEnabledInputs.length * Math.random());
  // get the empty input using the random index
  const inputRandom = emptyEnabledInputs[randomIndex];

  // Find the exact position of this input in enabledInputs
  const letterIndex = Array.from(enabledInputs).indexOf(inputRandom);

  if (letterIndex != -1)
    inputRandom.value = wordToGuess[letterIndex].toUpperCase();
}

/*
    Function Description:
        - responsible to handle backspace in the keyboard when clicked 
        - remove the value in the current input if there
        - if the current input already empty, then go back and remove the previous value
        - if we at first element remove its value when the backspace clicked
*/
function handleBackspace(event) {
  if (event.key === "Backspace") {
    // get all inputs that don't have disabled attribute
    const inputs = document.querySelectorAll("input:not([disabled])");

    // get the index of the active input (cursor on it)
    const currentIndex = Array.from(inputs).indexOf(document.activeElement);

    // This means that there is an element before the current (since current not first)
    if (currentIndex > 0) {
      // get the current input
      const currentInput = inputs[currentIndex];
      // get the previous input
      const prevInput = inputs[currentIndex - 1];

      // Check if the current input is empty, then go back & remove its value
      if (currentInput.value === "") {
        prevInput.focus();
        prevInput.value = "";
      } else {
        // here means that the current element not empty, then we need to remove it (case of last input)
        currentInput.value = "";
      }
    } else {
      // If it’s the first input, just clear its value
      inputs[0].value = "";
    }
  }
}

function restartGame() {
  // set new word to guses randomly
  wordToGuess = words[Math.floor(words.length * Math.random())].toLowerCase();
  console.log(`New Word: ${wordToGuess}`);

  // reset settings
  numberOfHints = 2;
  currentTry = 1;

  // update this in the html
  document.querySelector(".hint span").innerHTML = numberOfHints;

  // Clear and reset all inputs
  const allInputs = document.querySelectorAll(".inputs input");
  // Loop On all inputs to reset them
  allInputs.forEach((input) => {
    // reset value of the input
    input.value = "";
    // Disable all Inputs
    input.disabled = true;
    // Remove all old classes since we are reseting
    input.classList.remove("in-place", "not-in-place", "wrong");
  });

  // Enable only first div
  let firstTrvDiv = document.querySelector(`.try-${currentTry}`);
  firstTrvDiv.classList.remove("disabled-inputs");
  const nextTryIinputs = document.querySelectorAll(`.try-${currentTry} input`);
  nextTryIinputs.forEach((input) => (input.disabled = false));
  firstTrvDiv.children[1].focus();

  // Re-enable the hint button, if it exists
  const getHintButton = document.querySelector(".hint");
  getHintButton.disabled = false;

  // Re-enable the check button, if it exists
  const guessButton = document.querySelector(".check");
  guessButton.disabled = false;

  // Clear Message Area (win || Lose)
  messageArea.innerHTML = "";
}

document.addEventListener("keydown", handleBackspace);

window.onload = function () {
  generateInputs();
};
