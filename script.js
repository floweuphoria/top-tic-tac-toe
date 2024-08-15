const Gameboard = (function () {
    let arr = ['', '', '', '', '', '', '', '', ''];
    const getGameboard = () => arr;
    const getCell = (index) => arr[index];
    const updateCell = (index) => arr[index] = Game.getCurrentPlayer().getMarker();
    const resetGameboard = () => arr.fill('');
    return {
        getGameboard,
        getCell,
        updateCell,
        resetGameboard
    }
})();

const Player = function (name, marker) {
    return {
        name,
        getMarker: () => marker
    }
};

const Game = (function () {
    const winningCombos = [
        [0, 1, 2], // top row
        [3, 4, 5], // middle row
        [6, 7, 8], // bottom row
        [0, 3, 6], // left column
        [1, 4, 7], // middle column
        [2, 5, 8], // right column
        [0, 4, 8], // diagonal from top-left to bottom-right
        [2, 4, 6]  // diagonal from top-right to bottom-left
    ];
    let running = false;
    let players = [];
    let currentPlayerIndex;
    const startGame = (player1name, player2name) => {
        players = [Player(player1name, 'X'), Player(player2name, 'O')];
        running = true;
        currentPlayerIndex = 0;
        Gameboard.resetGameboard();
        DisplayController.updateStatusText(`${Game.getCurrentPlayer().name}'s turn`);
    }
    const getPlayers = () => players;

    const checkWinner = () => {
        const gameboard = Gameboard.getGameboard();
        for (let combo of winningCombos) {
            const [cellA, cellB, cellC] = combo;
            if (gameboard[cellA] && gameboard[cellA] === gameboard[cellB] && gameboard[cellA] === gameboard[cellC]) {
                DisplayController.updateStatusText(`${getCurrentPlayer().name} wins!`);
                running = false;
                return true;
            }
        }
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
        if (!gameboard.includes('')) {
            DisplayController.updateStatusText(`It's a draw!`);
        } else {
            DisplayController.updateStatusText(`${Game.getCurrentPlayer().name}'s turn`);
        }
    }
    const playRound = (index) => {
        if (running && Gameboard.getCell(index) === '') {
            Gameboard.updateCell(index);
            DisplayController.renderCell(index,);
            checkWinner();
        };
    }
    const resetGame = () => {
        Gameboard.resetGameboard();
        currentPlayerIndex = 0;
        DisplayController.updateStatusText(`${Game.getCurrentPlayer().name}'s turn`);
        winner = null;
        running = true;
        isDraw = false;
    };

    const getCurrentPlayer = () => players[currentPlayerIndex];

    return {
        getPlayers,
        playRound,
        isRunning: () => running,
        checkWinner,
        resetGame,
        getCurrentPlayer,
        startGame
    }
})();


const DisplayController = (function () {
    const cells = document.querySelectorAll('.cell');
    const statusText = document.querySelector('#statusText');
    const startButton = document.querySelector("#startBtn");
    const restartBtn = document.querySelector("#restartBtn");
    const player1Input = document.querySelector("#player1");
    const player2Input = document.querySelector("#player2");

    const initialize = () => {
        cells.forEach(cell => cell.addEventListener('click', (e) => {
            let index = e.target.getAttribute('data-index');
            if (Game.isRunning()) { Game.playRound(index, Game.getCurrentPlayer().getMarker()); }
        }));
        restartBtn.addEventListener('click', () => {
            Game.resetGame();
            clearBoard();
        });
        startButton.addEventListener('click', () => {
            let player1Name = player1Input.value;
            let player2Name = player2Input.value;
            if (player1Input.value && player2Input.value) {
                clearBoard();
                Game.startGame(player1Name, player2Name);
            }
        })
    };

    const clearBoard = () => {
        cells.forEach(cell => cell.textContent = '');
    }

    const renderCell = (index) => {
        cells[index].textContent = Game.getCurrentPlayer().getMarker();
    };

    const updateStatusText = (message) => {
        statusText.textContent = message;
    };

    return {
        initialize,
        renderCell,
        updateStatusText
    }
})();

DisplayController.initialize();