const board = (() => {
    let boardArr = ["", "", "", "", "", "", "", "", ""];
    const getBoard = () => boardArr;
    const setBoard = (position, marker) => {
        boardArr[position] = marker;
    }
    const reset = () => {
        boardArr = ["", "", "", "", "", "", "", "", ""];
        const positions = document.querySelectorAll(".position");
        positions.forEach( position => {
            position.classList.remove("notallowed");
            position.classList.remove("greyout");
        });
    }
    const display = () => {
        const position_0 = document.querySelector("#position-0")
        position_0.textContent = boardArr[0];
        if (boardArr[0].length) {
            position_0.classList.add("notallowed");
        }
        const position_1 = document.querySelector("#position-1");
        position_1.textContent = boardArr[1];
        if (boardArr[1].length) {
            position_1.classList.add("notallowed");
        }
        const position_2 = document.querySelector("#position-2");
        position_2.textContent = boardArr[2];
        if (boardArr[2].length) {
            position_2.classList.add("notallowed");
        }
        const position_3 = document.querySelector("#position-3");
        position_3.textContent = boardArr[3];
        if (boardArr[3].length) {
            position_3.classList.add("notallowed");
        }
        const position_4 = document.querySelector("#position-4");
        position_4.textContent = boardArr[4];
        if (boardArr[4].length) {
            position_4.classList.add("notallowed");
        }
        const position_5 = document.querySelector("#position-5");
        position_5.textContent = boardArr[5];
        if (boardArr[5].length) {
            position_5.classList.add("notallowed");
        }
        const position_6 = document.querySelector("#position-6");
        position_6.textContent = boardArr[6];
        if (boardArr[6].length) {
            position_6.classList.add("notallowed");
        }
        const position_7 = document.querySelector("#position-7");
        position_7.textContent = boardArr[7];
        if (boardArr[7].length) {
            position_7.classList.add("notallowed");
        }
        const position_8 = document.querySelector("#position-8");
        position_8.textContent = boardArr[8];
        if (boardArr[8].length) {
            position_8.classList.add("notallowed");
        }
    }
    return {
        getBoard,
        setBoard,
        reset,
        display
    };
})();

const Player = (marker) => {
    let name = "Unknown player";
    const setName = (input) => {
        name = input;
    }
    const getName = () => name;
    const getMarker = () => marker;
    return {
        setName,
        getName,
        getMarker,
    }
}

const p1 = Player("O");
const p2 = Player("X");

const displayController = ((gameBoard, playerOne, playerTwo) => {

    let turn = 1;
    const getTurn = () => turn % 2;
    const nextTurn = () => {
        turn += 1;
    };

    const message = document.querySelector("#gameInfo");
    const setMessage = (msg) => {
        message.textContent = msg;
    }
    
    const enableListener = () => {
        const positions = document.querySelectorAll(".position");
        positions.forEach( position => {
            position.addEventListener("click", placeMarker);
            position.classList.add("pointer");
        });
    }

    const disableListener = () => {
        const positions = document.querySelectorAll(".position");
        positions.forEach( position => {
            position.removeEventListener("click", placeMarker);
            position.classList.add("notallowed");
            position.classList.add("greyout");
        });
    }

    const checkEnd = (player) => {
        if ((gameBoard.getBoard()[0] === gameBoard.getBoard()[1] && gameBoard.getBoard()[1] === gameBoard.getBoard()[2] && gameBoard.getBoard()[0] !== "") || 
            (gameBoard.getBoard()[3] === gameBoard.getBoard()[4] && gameBoard.getBoard()[4] === gameBoard.getBoard()[5] && gameBoard.getBoard()[3] !== "") ||
            (gameBoard.getBoard()[6] === gameBoard.getBoard()[7] && gameBoard.getBoard()[7] === gameBoard.getBoard()[8] && gameBoard.getBoard()[6] !== "") ||
            (gameBoard.getBoard()[0] === gameBoard.getBoard()[3] && gameBoard.getBoard()[3] === gameBoard.getBoard()[6] && gameBoard.getBoard()[0] !== "") || 
            (gameBoard.getBoard()[1] === gameBoard.getBoard()[4] && gameBoard.getBoard()[4] === gameBoard.getBoard()[7] && gameBoard.getBoard()[1] !== "") || 
            (gameBoard.getBoard()[2] === gameBoard.getBoard()[5] && gameBoard.getBoard()[5] === gameBoard.getBoard()[8] && gameBoard.getBoard()[2] !== "") || 
            (gameBoard.getBoard()[0] === gameBoard.getBoard()[4] && gameBoard.getBoard()[4] === gameBoard.getBoard()[8] && gameBoard.getBoard()[0] !== "") ||
            (gameBoard.getBoard()[2] === gameBoard.getBoard()[4] && gameBoard.getBoard()[4] === gameBoard.getBoard()[6] && gameBoard.getBoard()[2] !== "")) {
                if (player === 1) {
                    setMessage(`${playerOne.getName()} won the game!`);
                }
                else {
                    setMessage(`${playerTwo.getName()} won the game!`);
                }
                disableListener();
            }
        else {
            let taken = "";
            for (let position of gameBoard.getBoard()) {
                taken += position;
            }
            if (taken.length === 9) {
                setMessage("It's a draw. Play again!");
                disableListener();
            } 
            else {
                if (player === 1) {
                    setMessage(`${playerTwo.getName()}'s turn now.`);
                }
                else setMessage(`${playerOne.getName()}'s turn now.`);
            }
        }
    };

    const placeMarker = (event) => {
        if (event.target.textContent == playerOne.getMarker() || event.target.textContent == playerTwo.getMarker()) {
            alert("This spot has been taken already. Choose again!");
            return;
        }
        pos = event.target.id.slice(-1);
        if (getTurn() === 1) {
            gameBoard.setBoard(pos, playerOne.getMarker());
        }
        else gameBoard.setBoard(pos, playerTwo.getMarker());
        gameBoard.display();
        checkEnd(getTurn());
        nextTurn();
    };

    const start = () => {

        const startButton = document.querySelector("#startButton");
        startButton.value = "Reset";

        gameBoard.reset();
        gameBoard.display();

        if (getTurn() === 1) setMessage(`${playerOne.getName()}'s turn now.`);
        else setMessage(`${playerTwo.getName()}'s turn now.`);

        enableListener();
    };

    return {
        start
    };
})(board, p1, p2);

function startGame() {
    let playerOneName = document.forms["playerName"]["playerOne"].value;
    p1.setName(playerOneName);
    let playerTwoName = document.forms["playerName"]["playerTwo"].value;
    p2.setName(playerTwoName);
    displayController.start();
    return false;
}