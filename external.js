const board = (() => {
    let boardArr = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    const getBoard = () => boardArr;
    const setBoard = (position, marker) => {
        boardArr[position] = marker;
    }
    const reset = () => {
        boardArr = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
    const display = () => {
        const position_0 = document.querySelector("#position-0");
        position_0.textContent = boardArr[0];
        const position_1 = document.querySelector("#position-1");
        position_1.textContent = boardArr[1];
        const position_2 = document.querySelector("#position-2");
        position_2.textContent = boardArr[2];
        const position_3 = document.querySelector("#position-3");
        position_3.textContent = boardArr[3];
        const position_4 = document.querySelector("#position-4");
        position_4.textContent = boardArr[4];
        const position_5 = document.querySelector("#position-5");
        position_5.textContent = boardArr[5];
        const position_6 = document.querySelector("#position-6");
        position_6.textContent = boardArr[6];
        const position_7 = document.querySelector("#position-7");
        position_7.textContent = boardArr[7];
        const position_8 = document.querySelector("#position-8");
        position_8.textContent = boardArr[8];
    }
    return {
        getBoard,
        setBoard,
        reset,
        display
    };
})();

const Player = (name, marker) => {
    const getName = () => name;
    const getMarker = () => marker;
    return {
        getName,
        getMarker,
    }
}

const p1 = Player('Player One', 1);
const p2 = Player('Player Two', 2);

const displayController = ((gameBoard, playerOne, playerTwo) => {

    let turn = 1;
    const getTurn = () => turn % 2;
    const nextTurn = () => {
        turn += 1;
    };

    const checkEnd = (player) => {
        if ((gameBoard.getBoard()[0] === gameBoard.getBoard()[1] && gameBoard.getBoard()[1] === gameBoard.getBoard()[2] && gameBoard.getBoard()[0] !== 0) || 
            (gameBoard.getBoard()[3] === gameBoard.getBoard()[4] && gameBoard.getBoard()[4] === gameBoard.getBoard()[5] && gameBoard.getBoard()[3] !== 0) ||
            (gameBoard.getBoard()[6] === gameBoard.getBoard()[7] && gameBoard.getBoard()[7] === gameBoard.getBoard()[8] && gameBoard.getBoard()[6] !== 0) ||
            (gameBoard.getBoard()[0] === gameBoard.getBoard()[3] && gameBoard.getBoard()[3] === gameBoard.getBoard()[6] && gameBoard.getBoard()[0] !== 0) || 
            (gameBoard.getBoard()[1] === gameBoard.getBoard()[4] && gameBoard.getBoard()[4] === gameBoard.getBoard()[7] && gameBoard.getBoard()[1] !== 0) || 
            (gameBoard.getBoard()[2] === gameBoard.getBoard()[5] && gameBoard.getBoard()[5] === gameBoard.getBoard()[8] && gameBoard.getBoard()[2] !== 0) || 
            (gameBoard.getBoard()[0] === gameBoard.getBoard()[4] && gameBoard.getBoard()[4] === gameBoard.getBoard()[8] && gameBoard.getBoard()[0] !== 0) ||
            (gameBoard.getBoard()[2] === gameBoard.getBoard()[4] && gameBoard.getBoard()[4] === gameBoard.getBoard()[6] && gameBoard.getBoard()[2] !== 0)) {
                if (player === 1) alert(`${playerOne.getName()} Won!`);
                else alert(`${playerTwo.getName()} Won!`);
                gameBoard.reset();
                gameBoard.display();
            }
        else if (Math.min(...gameBoard.getBoard()) > 0) {
            alert("Draw!");
            gameBoard.reset();
            gameBoard.display();
        }
    };

    const placeMarker = (event) => {
        if (event.target.textContent !== "0") {
            alert("This position has been marked already! Please choose again.");
            return;
        }
        pos = event.target.id.slice(-1);
        if (getTurn() === 1) {
            gameBoard.setBoard(pos, playerOne.getMarker());
        }
        else gameBoard.setBoard(pos, playerTwo.getMarker());
        gameBoard.display();
        setTimeout(checkEnd, 1, getTurn());
        nextTurn();
    };

    const positions = document.querySelectorAll(".position");
    positions.forEach( position => {
        position.addEventListener("click", placeMarker);
    });

    const start = () => {
        gameBoard.display();
    };

    return {
        start
    };
})(board, p1, p2);

displayController.start();