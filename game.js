let currentPlayer = 'X';
let gameActive = true;
const statusDisplay = document.getElementById("status");// gets elemetnt with id status
const restartButton = document.getElementById("restart");
const cells = Array.from(document.querySelectorAll(".cell"));
const winningConditions = [
    [0,1,2],[3,4,5],[6,7,8], // Rows
    [0,3,6],[1,4,7],[2,5,8], // Columns
    [0,4,8],[2,4,6]          // Diagonals
];
let gameState = ["","","","","","","","",""]; // initial state of the game

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedIndex = cells.indexOf(clickedCell); //stores index of game cell
    if (gameState[clickedIndex] !== "" || !gameActive) { // checks if cell is already clicked or game is not active
        return;
    }
    gameState[clickedIndex] = currentPlayer; // assigns game state with current player
    clickedCell.textContent = currentPlayer; // updates the cell with current player
    clickedCell.classList.add(currentPlayer.toLowerCase());//adds css effect

    if (checkWin()) { // checks if current player has won
        gameActive = false;
        document.querySelector("h1").textContent = "Player " + currentPlayer + " has won! 🥳";
        return;
    }

    if (checkDraw()) { // checks for draw
        gameActive = false;
        document.querySelector("h1").textContent = "It's a draw! 🤝";
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X"; // chnages player
    statusDisplay.textContent = currentPlayer + "'s turn"; // changes status display
}

function checkWin() {
    return winningConditions.some(condition => { // compares current condition to winning consitions
        const [a, b, c] = condition;  // assigns a,b,c to the  current condition to check for win 
        return gameState[a] === currentPlayer && gameState[b] === currentPlayer && gameState[c] === currentPlayer; // returns true if condtion matches the player
    });
}

function checkDraw() {
    return gameState.every(cell => cell !== ""); // checks if every cell is filled
}

function restartGame() {
    currentPlayer = "X";
    gameActive = true;
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.textContent = currentPlayer + "'s turn";
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("x", "o");
        document.querySelector("h1").textContent = "Tic Tac Toe"});
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
restartButton.addEventListener("click", restartGame);
 // event listeners


