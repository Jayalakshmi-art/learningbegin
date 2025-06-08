const board = document.getElementById("game-board");
const statusText = document.getElementById("status");
let cells = [];
let currentPlayer = "X";
let gameActive = true;

// Winning combinations
const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

function createBoard() {
  board.innerHTML = "";
  cells = [];

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleMove);
    board.appendChild(cell);
    cells.push(cell);
  }

  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function handleMove(e) {
  const index = e.target.dataset.index;

  if (!gameActive || cells[index].textContent !== "") return;

  cells[index].textContent = currentPlayer;

  if (checkWin(currentPlayer)) {
    statusText.textContent = `🎉 Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (isDraw()) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin(player) {
  return winPatterns.some(pattern => 
    pattern.every(index => cells[index].textContent === player)
  );
}

function isDraw() {
  return cells.every(cell => cell.textContent !== "");
}

function resetGame() {
  currentPlayer = "X";
  gameActive = true;
  createBoard();
}

createBoard();
