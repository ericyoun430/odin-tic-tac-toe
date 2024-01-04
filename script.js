function Player(symbol) {
    return {symbol};
}

const gameboard = (function Gameboard() {
    let board = ['','','','','','','','',''];

    return {board};
})();

const displayController = (function DisplayController(doc) {
    const displaySquares = function Move() {
        const userBoard = doc.querySelector(".square-container");
        for (let i = 0; i < gameboard.board.length; i++) {
            userBoard.children.item(i).firstElementChild.textContent = gameboard.board[i];
        }
    }

    const displayWinner = function Winner(winner) {
        const winNode = doc.querySelector("h2");
        winNode.textContent = `The player using the ${winner} symbol won!`;
    }

    return {displaySquares,displayWinner};
})(document);


const game = (function Game(doc) {
    const playerOne = Player("X");
    const playerTwo = Player("O");
    let turn = 1;

    let gameOver = function GameOver() {
        
        let board = gameboard.board;

        for(let i = 0; i < 3; i++) {
            //row case
            if (
                (board[i*3] && board[i*3+1] && board[i*3+2]) != '' &&
                (board[i*3] === board[i*3+1]) &&
                (board[i*3] === board[i*3+2]) &&
                (board[i*3] === playerOne.symbol || board[i*3] === playerTwo.symbol)
                ) {
                return (board[i*3] === playerOne.symbol ? playerOne.symbol : playerTwo.symbol);
            }
            //column case
            if (
                (board[i] && board[i+3] && board[i+6]) != '' &&
                (board[i] === board[i+3]) &&
                (board[i] === board[i+6]) &&
                (board[i]===playerOne.symbol || board[i]===playerTwo.symbol)
                ) {
                return (board[i] === playerOne.symbol ? playerOne.symbol : playerTwo.symbol);
            }
        }

        //diagonal case
        if (
            (board[0] === board[4]) &&
            (board[0] === board[8]) &&
            (board[0]===playerOne.symbol || board[0]===playerTwo.symbol)
            ) {
            return (board[0] === playerOne.symbol ? playerOne.symbol : playerTwo.symbol);
        } else if (
            (board[2] === board[4]) &&
            (board[2] === board[6]) &&
             (board[2]===playerOne.symbol || board[2]===playerTwo.symbol)
             ) {
            return (board[2] === playerOne.symbol ? playerOne.symbol : playerTwo.symbol);
        }

        return false;
    }

    const squares = doc.querySelectorAll(".square").forEach((square)=> {
        square.addEventListener('click', () => {
            const boardIndex = Number(square.firstElementChild.getAttribute("id"));
            let gameStatus = gameOver();
            if (gameStatus !== false) {
                displayController.displayWinner(gameStatus);
                return;
            }
            //player 1's turn
            if (gameboard.board[boardIndex] === '' && turn % 2 === 1) {
                gameboard.board[boardIndex] = playerOne.symbol;
                turn+=1;
            //player 2's turn
            } else if (gameboard.board[boardIndex] === '') {
                gameboard.board[boardIndex] = playerTwo.symbol;
                turn+=1;
            }

            displayController.displaySquares();
            gameStatus = gameOver();
            if (gameStatus !== false) {
                displayController.displayWinner(gameStatus);
                return;
            }
        })
    });
})(document);