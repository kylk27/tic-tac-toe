const Gameboard = (function () {
    let board = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];

    const printBoard = () => console.log(board);

    const getBoard = () => board;

    const clearBoard = () => board = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];

    const drawMarker = (player, cell) => {
        switch (cell) {
            case 1:
                if (board[0][0] === " ") {
                    board[0][0] = player.marker;
                } else {
                    console.log(`[!] Cell is already occupied. Pick another one.`);
                    return true;
                };
            break;
            case 2:
                if (board[0][1] === " ") {
                    board[0][1] = player.marker;
                } else {
                    console.log(`[!] Cell is already occupied. Pick another one.`);
                    return true;
                };
            break;
            case 3:
                if (board[0][2] === " ") {
                    board[0][2] = player.marker;
                } else {
                    console.log(`[!] Cell is already occupied. Pick another one.`);
                    return true;
                };
            break;
            case 4:
                if (board[1][0] === " ") {
                    board[1][0] = player.marker;
                } else {
                    console.log(`[!] Cell is already occupied. Pick another one.`);
                    return true;
                };
            break;
            case 5:
                if (board[1][1] === " ") {
                    board[1][1] = player.marker;
                } else {
                    console.log(`[!] Cell is already occupied. Pick another one.`);
                    return true;
                };
            break;
            case 6:
                if (board[1][2] === " ") {
                    board[1][2] = player.marker;
                } else {
                    console.log(`[!] Cell is already occupied. Pick another one.`);
                    return true;
                };
            break;
            case 7:
                if (board[2][0] === " ") {
                    board[2][0] = player.marker;
                } else {
                    console.log(`[!] Cell is already occupied. Pick another one.`);
                    return true;
                };
            break;
            case 8:
                if (board[2][1] === " ") {
                    board[2][1] = player.marker;
                } else {
                    console.log(`[!] Cell is already occupied. Pick another one.`);
                    return true;
                };
            break;
            case 9:
                if (board[2][2] === " ") {
                    board[2][2] = player.marker;
                } else {
                    console.log(`[!] Cell is already occupied. Pick another one.`);
                    return true;
                };
        };
    };

    return {printBoard, getBoard, clearBoard, drawMarker};
})();


const Game = (function () {

    function createPlayer (name, marker) {
        return {name, marker}
    }

    function checkForWinner(board) {
        const winningCombinations = [
            [board[0][0], board[0][1], board[0][2]],
            [board[1][0], board[1][1], board[1][2]],
            [board[2][0], board[2][1], board[2][2]],
            [board[0][0], board[1][0], board[2][0]],
            [board[0][1], board[1][1], board[2][1]],
            [board[0][2], board[1][2], board[2][2]],
            [board[0][0], board[1][1], board[2][2]],
            [board[0][2], board[1][1], board[2][0]]
        ]
        for (let i = 0; i < winningCombinations.length; i++) {
            const [a, b, c] = winningCombinations[i];
            if ((a !== " ") && (a === b) && (a === c)) {
                return true;
            }
            
        }
        
    }
    
    function checkForTie(board) {
        return board.every(item => item.every(cell => cell !== " "));
    }

    const players = [createPlayer('Player1', 'X'),
                     createPlayer('Player2', 'O')];
    let activePlayer = players[0];
    let gameOver = false;

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const resetGame = () => {
        Gameboard.clearBoard();
        gameOver = false;
        activePlayer = players[0];
        Gameboard.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    }

    const playRound = (cell) => {
        // Drop a token for the current player
        if (gameOver === true) {
            console.log(`Game over. Reset game to play again`);
            return;
        }

        console.log(`Putting ${getActivePlayer().name}'s marker into cell ${cell}...`);
        
        if (Gameboard.drawMarker(getActivePlayer(), cell)) {
            Gameboard.printBoard();
            return;
        }
        
        Gameboard.printBoard();

        if (checkForWinner(Gameboard.getBoard())) {
            console.log(`${getActivePlayer().name} won!`);
            gameOver = true;
            return;
        }

        if (checkForTie(Gameboard.getBoard())) {
            console.log(`It's a tie!`);
            gameOver = true;
        }

        // Switch player turn
        switchPlayerTurn();
        if (gameOver === false) {
            console.log(`${getActivePlayer().name}'s turn.`);
        }
    };

    // Initial play game message
    Gameboard.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  
    return {
      playRound,
      getActivePlayer,
      resetGame
    };
})();