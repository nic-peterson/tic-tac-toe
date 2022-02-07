const gameBoard = (() => {
  const board = [...Array(9)];
  const boardContainer = document.querySelector(".board");

  const display = () => {
    board.forEach(function (elt, index) {
      const square = document.createElement("div");
      square.setAttribute("class", "square");
      square.setAttribute("id", `${index}`);
      square.addEventListener("click", onClick, false);
      boardContainer.appendChild(square);
    });

    return board;
  };

  const onClick = (e) => {
    game.checkXTurn()
      ? updateCell(e.target.id, "X")
      : updateCell(e.target.id, "O");
    e.target.textContent = board[e.target.id];
    console.log(board);
  };

  const updateCell = (idx, val) => {
    if (!board[idx]) {
      board[idx] = val;
      console.log(`board[idx]: ${board[idx]}`);
      if (game.checkIfWon(val)) {
        game.checkXTurn()
          ? console.log(game.displayOutcomes(0))
          : console.log(game.displayOutcomes(1));
      } else if (checkIfTie()) {
        console.log(game.displayOutcomes(2));
      } else {
        game.changeTurns();
      }
    } else {
      console.log("that space is already taken!");
    }
  };

  const clearBoard = () => {
    document
      .querySelectorAll(".square")
      .forEach((e) => e.parentNode.removeChild(e));
  };

  const resetBoard = () => {
    board.forEach(function (elt, index) {
      board[index] = undefined;
    });
  };

  const isEmpty = () => {
    return Array.isArray(board) && board.length ? true : false;
  };

  const isFull = () => {
    let bool = true;
    board.forEach(function (elt) {
      if (elt === undefined) {
        bool = false;
      }
    });

    return bool;
  };

  const checkType = () => {
    board.forEach((elt) => console.log(`type ${typeof elt}`));
  };

  return {
    display,
    updateCell,
    clearBoard,
    resetBoard,
    checkType,
    isEmpty,
    isFull,
  };
})();

/* 
Winning combinations:
0 - 1 - 2
0 - 4 - 8
0 - 3 - 6
1 - 4 - 7
2 - 5 - 8
2 - 4 - 6
3 - 4 - 5
6 - 7 - 8

*/

const game = (() => {
  const startbtn = document.querySelector("#start");

  const outcomes = ["X Wins!", "O Wins!", "It's a Tie!"];
  const winConditions = [
    [0, 1, 2],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
  ];
  let isXTurn = true;
  let isGameLive = false;
  startbtn.addEventListener("click", gameStart, false);

  function gameStart() {
    if (!isGameLive) {
      console.log("click");
      gameBoard.display();
      toggleIsGameLive();
    } else {
      gameBoard.resetBoard();
      gameBoard.clearBoard();
      gameBoard.display();
    }
  }

  const checkIfWon = (val) => {
    let bool = false;
    winConditions.forEach(function (elt, index) {
      if (
        board[elt[0]] === board[elt[1]] &&
        board[elt[1]] === board[elt[2]] &&
        board[elt[2]] === val
      ) {
        bool = true;
      }
    });
    return bool;
  };

  const checkIfTie = () => {
    let bool;
    if (isFull()) {
      if (checkIfWon("X") || checkIfWon("O")) {
        bool = false;
      } else {
        bool = true;
      }
    }
    return bool;
  };

  const toggleIsGameLive = () => {
    return (isGameLive = !isGameLive);
  };

  const displayOutcomes = (outcome) => {
    return outcomes[outcome];
  };

  const changeTurns = () => {
    isXTurn = !isXTurn;
    return isXTurn;
  };

  const checkXTurn = () => {
    console.log(`checkXTurn: ${isXTurn}`);
    return isXTurn;
  };

  const reportWin = (winFlag, tieFlag) => {
    if (winFlag === true) {
      if (isXTurn) {
        return displayOutcomes(0);
      } else {
        return displayOutcomes(1);
      }
    } else if (tieFlag === true) {
      return displayOutcomes(2);
    } else {
      return;
    }
  };

  return {
    displayOutcomes,
    changeTurns,
    checkXTurn,
    reportWin,
    checkIfTie,
    checkIfWon,
  };
})();

const playerFactory = (role) => {
  const sayRole = () => console.log(`My role is ${role}`);
  return { sayRole };
};

const playerX = playerFactory("X");
const playerO = playerFactory("O");

//console.log(gameBoard.display());

/*

console.log(`Is the array empty?\n${gameBoard.isEmpty()}`);
console.log(`Is the array full?\n${gameBoard.isFull()}`);
gameBoard.updateCell(1, "X");

console.log(gameBoard.display());
gameBoard.updateCell(1, "O");
console.log(gameBoard.display());
gameBoard.clearBoard();
console.log("CLEAR");
console.log(gameBoard.display());
gameBoard.updateCell(0, "X");

gameBoard.updateCell(4, "X");

gameBoard.updateCell(8, "X");
console.log(gameBoard.display());
gameBoard.checkIfWon();
gameBoard.clearBoard();
console.log(gameBoard.display());
gameBoard.updateCell(0, "X");

gameBoard.updateCell(1, "X");

gameBoard.updateCell(2, "X");
console.log(gameBoard.display());
gameBoard.checkIfWon();
gameBoard.clearBoard();
console.log(gameBoard.display());
gameBoard.updateCell(6, "O");

gameBoard.updateCell(7, "O");

gameBoard.updateCell(8, "O");
console.log(gameBoard.display());
console.log(gameBoard.checkIfWon());
console.log(game.reportWin(gameBoard.checkIfWon(), gameBoard.checkIfTie()));
console.log(`Is the array full?\n${gameBoard.isFull()}`);
gameBoard.clearBoard();
for (let i = 0; i < 9; i++) {
  if (i % 2 === 0) {
    gameBoard.updateCell(i, "X");
  } else {
    gameBoard.updateCell(i, "O");
  }
}
console.log(gameBoard.display());
console.log(`Is the array full?\n${gameBoard.isFull()}`);
console.log(gameBoard.checkIfWon());
console.log(game.reportWin(gameBoard.checkIfWon(), gameBoard.checkIfTie()));
console.log(game.reportWin(gameBoard.checkIfWon()));


gameBoard.checkType();
console.log(game.displayOutcomes(0));
console.log(game.displayOutcomes(1));
console.log(game.displayOutcomes(2));

console.log(game.changeTurns());
console.log(game.changeTurns());
console.log(game.changeTurns());
*/

/*
Board
0 1 2
3 4 5
6 7 8

Winning combinations:
0 - 1 - 2
0 - 4 - 8
0 - 3 - 6
1 - 4 - 7
2 - 5 - 8
2 - 4 - 6
3 - 4 - 5
6 - 7 - 8

*/
