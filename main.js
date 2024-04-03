const Gameboard = (function () {
    let board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];

    const getBoard = () => board;

    const clearBoard = () => board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];

    const drawMarker = (player, index) => {
        if (board[index] === " ") {
            board[index] = player.marker;
        } else {
            console.log(`[!] Cell is already occupied. Pick another one.`);
            return true;
        };
    };

    return {getBoard, clearBoard, drawMarker};
})();

const Game = (function () {

    function createPlayer (name, marker) {
        return {name, marker}
    }

    const players = [createPlayer('Player X', '✘'),
                     createPlayer('Player O', 'O')];
    let activePlayer = players[0];
    let gameOver = false;

    const getActivePlayer = () => activePlayer;

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    function checkForWinner(array) {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        for (let i = 0; i < winningCombinations.length; i++) {
            const [a, b, c] = winningCombinations[i];
            if ((array[a] !== " ") && (array[a] === array[b]) && (array[a] === array[c])) {
                return true;
            }     
        }    
    }
    
    function checkForTie(array) {
        return array.every(item => item !== " ");
    }

    const resetGame = () => {
        Gameboard.clearBoard();
        activePlayer = players[0];
    }
  
    return {
      gameOver,
      getActivePlayer,
      switchPlayerTurn,
      checkForWinner,
      checkForTie,
      resetGame
    };
})();

const screenController = (function () {
    const body = document.querySelector('body');
    const title = document.createElement('h1');
    const container = document.createElement('div');
    const gameStatus = document.createElement('div');
    const boxesContainer = document.createElement('div');
    const resetButton = document.createElement('button');
    const footer = document.querySelector('footer');

    container.setAttribute('class', 'container');
    gameStatus.setAttribute('class', 'game-status');
    boxesContainer.setAttribute('class', 'boxes-container');
    resetButton.setAttribute('class', 'reset-button');

    body.appendChild(title);
    body.appendChild(container);
    container.appendChild(gameStatus);
    container.appendChild(boxesContainer);
    container.appendChild(resetButton);
    body.appendChild(footer);
    
    title.textContent = 'Tic Tac Toe';
    gameStatus.textContent = `${Game.getActivePlayer().name}'s turn`;
    resetButton.textContent = 'Reset';

    function removeBoxes(container) {
        while (container.firstChild) {
            container.removeChild(container.lastChild);
          }
    };
    
    function renderBoard (array) {
        for (let i = 0; i < array.length; i++) {
            let box = document.createElement('div');
            box.setAttribute('class', 'box');
            box.textContent = array[i];
            boxesContainer.appendChild(box);

            box.addEventListener('click', () => {
                if (Game.gameOver === true) {
                    return;
                }

                if (Gameboard.drawMarker(Game.getActivePlayer(), i)) {
                    return;
                }

                box.textContent = Game.getActivePlayer().marker;

                if (Game.checkForWinner(Gameboard.getBoard())) {
                    gameStatus.textContent = `${Game.getActivePlayer().name} has won!`;
                    Game.gameOver = true;
                    return;
                }

                if (Game.checkForTie(Gameboard.getBoard())) {
                    gameStatus.textContent = `It's a tie!`;
                    Game.gameOver = true;
                    return;
                }

                Game.switchPlayerTurn();
                gameStatus.textContent = `${Game.getActivePlayer().name}'s turn`;  
            });
        };
    };

    renderBoard(Gameboard.getBoard());
    
    resetButton.addEventListener('click', () => {
        Game.gameOver = false;
        Game.resetGame();
        gameStatus.textContent = `${Game.getActivePlayer().name}'s turn`;
        removeBoxes(boxesContainer);
        renderBoard(Gameboard.getBoard());
    })
})();