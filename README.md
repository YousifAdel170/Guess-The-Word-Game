# Guess-The-Word-Game

A fun and interactive "Guess The Word" game where players try to guess a hidden word within a limited number of attempts. This game is built with vanilla JavaScript, HTML, and CSS, making it a lightweight yet engaging browser-based word puzzle.

## Game Features

### Word Guessing Mechanics:

Players have a fixed number of tries to guess a six-letter word. After each attempt, letters are color-coded to provide hints:

#### Green

indicates that the letter is correct and in the correct position.

#### Yellow

indicates that the letter is correct but in the wrong position.

#### Red

indicates an incorrect letter.

### Hints:

Players can use hints to reveal one of the letters of the word. The number of hints is limited, and each hint decreases the remaining count.

### User-Friendly Input System:

Inputs are automatically focused, moving to the next input box as the player types. The game also allows navigation with arrow keys and handles backspacing smoothly across inputs.

### Restart Functionality:

After winning or losing, players can start a new game with a different word by clicking the restart button.

## How to Play

### 1. Enter Your Guess:

Type one letter in each box to form a word.

### 2. Submit the Guess:

Click the "Check" button to submit your guess.

### 3. Use Hints Wisely:

Click the "Hint" button to reveal a letter (limited uses).

### 4. Win or Try Again:

If you guess the word within the allowed attempts, you win! Otherwise, the correct word will be revealed after all attempts.

## Built With

### JavaScript:

Game logic for input handling, validations, hint system, and win/lose conditions.

### HTML & CSS:

Simple, responsive layout and styling.

## Project Setup

### 1. Clone the repository:

git clone git@github.com:YousifAdel170/Guess-The-Word-Game.git

### 2. Open the index.html file in your browser to start playing the game.

## Future Improvements

### Add more challenging words.

### Implement different difficulty levels.

### Add animations or sound effects to enhance the gaming experience.
