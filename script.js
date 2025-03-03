const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetBtn = document.getElementById('reset');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

cells.forEach(cell => {
  cell.addEventListener('click', () => {
    const index = cell.getAttribute('data-index');
    if (board[index] === '' && gameActive) {
      board[index] = currentPlayer;
      cell.textContent = currentPlayer;
      checkWinner();
      if (gameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Turn: ${currentPlayer}`;
      }
    }
  });
});

resetBtn.addEventListener('click', resetGame);

function checkWinner() {
  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
    [0, 4, 8], [2, 4, 6] // Diagonales
  ];
  for (let condition of winConditions) {
    if (board[condition[0]] && board[condition[0]] === board[condition[1]] && board[condition[1]] === board[condition[2]]) {
      status.textContent = `${board[condition[0]]} win!`;
      gameActive = false;
      // Aplica la clase 'winner' a las celdas ganadoras
      condition.forEach(index => {
        cells[index].classList.add('winner');
      });
      return;
    }
  }
  if (!board.includes('')) {
    status.textContent = '¡Draw!';
    gameActive = false;
  }
}

function resetGame() {
  currentPlayer = 'X';
  board = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  status.textContent = `Turn: ${currentPlayer}`;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('winner'); // Quita la clase al reiniciar
  });
}