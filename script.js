let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

document.addEventListener('DOMContentLoaded', init);

function init() {
    createBoard();
    updateResult();
}

function createBoard() {
    const boardContainer = document.getElementById('board');

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', handleCellClick);
        boardContainer.appendChild(cell);
    }
}

function handleCellClick(event) {
    const cellIndex = event.target.getAttribute('data-index');

    if (board[cellIndex] === '' && gameActive) {
        board[cellIndex] = currentPlayer;
        event.target.textContent = currentPlayer;
        checkWinner();
        togglePlayer();
    }
}

function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            document.getElementById('result').textContent = `${currentPlayer} wins!`;
        }
    }

    if (!board.includes('') && gameActive) {
        gameActive = false;
        document.getElementById('result').textContent = "It's a tie!";
    }
}

function updateResult() {
    const resultContainer = document.getElementById('result');
    resultContainer.textContent = `Current player: ${currentPlayer}`;
}

function resetGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;

    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = '';
    });

    document.getElementById('result').textContent = '';
    updateResult();
}
