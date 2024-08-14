const Gameboard = (function () {
    let arr = ['', '', '', '', '', '', '', '', ''];
    return {
        getGameboard: () => arr,
        updateGameboard: (spot, marker) => arr[spot] = marker,
        resetGameboard: () => arr.fill('')
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

    let isGameOver = false;
    let winner;
    let isDraw;

    return {
        play: (spot, marker) => {
            let gameboard = Gameboard.getGameboard();
            if (!isGameOver && !gameboard[spot]) { Gameboard.updateGameboard(spot, marker) };
            Game.checkGame();
        },
        checkGame: () => {
            let gameboard = Gameboard.getGameboard();
            for (let combo of winningCombos) {
                if (gameboard[combo[0]] && gameboard[combo[0]] === gameboard[combo[1]] && gameboard[combo[1]] === gameboard[combo[2]]) {
                    console.log(`${gameboard[combo[0]]} wins!`);
                    isGameOver = true;
                    winner = gameboard[combo[0]];
                    return;
                }
            }
            // check if it's a draw
            const isMarked = marker => marker === 'x' || marker === 'o';
            isDraw = gameboard.every(spot => isMarked(spot));
            if (!isGameOver) { console.log('No winner yet.') };
            if (isDraw) {
                console.log('It\'s a draw')
                isGameOver = true;
            }
            console.log(gameboard);
            return;
        },
        resetGame: () => {
            Gameboard.resetGameboard();
            winner = null;
            isGameOver = false;
            isDraw = false;
        }
    }
})();

const player1 = Player('player1', 'o');
const player2 = Player('player2', 'x');

Game.play(0, player2.getMarker());
Game.play(1, player2.getMarker());
Game.play(2, player2.getMarker());