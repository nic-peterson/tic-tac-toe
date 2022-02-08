const gameBoard = (() => {
  const board = [...Array(9)];
  const boardContainer = document.querySelector(".board");
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
      if (checkIfWon(val)) {
        game.checkXTurn();
        game.reportWin(true, false);
      } else if (checkIfTie()) {
        game.reportWin(false, true);
      } else {
        game.changeTurns();
      }
    } else {
      game.openModal(game.displayOutcomes(3));
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
    checkIfWon,
    isEmpty,
    isFull,
    checkIfTie,
  };
})();

const game = (() => {
  let isXTurn = true;
  let isGameLive = false;
  let isGameOver = false;
  const outcomes = [
    "X Wins!",
    "O Wins!",
    "It's a Tie!",
    "That space is already taken!",
  ];

  const modal = document.getElementById("myModal");
  const modalContent = document.getElementById("modal-content");
  const startbtn = document.querySelector("#start");
  startbtn.addEventListener("click", gameStart, false);

  const span = document.getElementsByClassName("close")[0];
  span.addEventListener("click", closeModal, false);

  function gameStart() {
    if (!isGameLive) {
      console.log("click");
      gameBoard.display();
      toggleIsGameLive();
    } else {
      gameBoard.resetBoard();
      gameBoard.clearBoard();
      gameBoard.display();
      resetIsXTurn();
      changeIsGameOver();
    }
  }

  function openModal(string) {
    modal.style.display = "flex";
    if (string) {
      const msg = document.createElement("p");
      msg.setAttribute("class", "msg");
      msg.setAttribute("id", "msg");
      msg.textContent = string;
      modalContent.appendChild(msg);
    }
  }

  function closeModal() {
    let node = document.getElementById("msg");
    if (node.parentNode) {
      node.parentNode.removeChild(node);
    }
    modal.style.display = "none";
    if(isGameOver) {
      gameStart();
    }
  }

  window.onclick = function (event) {
    if (event.target == modal) {
      closeModal();
    }
  };


  // Create a way for users to input their names

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

  function resetIsXTurn() {
    isXTurn = true;
  }

  function changeIsGameOver() {
    isGameOver = !isGameOver;
    return isGameOver;
  }

  const reportWin = (winFlag, tieFlag) => {
    if (winFlag === true) {
      if (isXTurn) {
        openModal(displayOutcomes(0));
        changeIsGameOver();
      } else {
        openModal(displayOutcomes(1));
        changeIsGameOver();
      }
    } else if (tieFlag === true) {
      openModal(displayOutcomes(2));
      changeIsGameOver();
    } else {
      return;
    }
  };

  return { displayOutcomes, changeTurns, checkXTurn, reportWin, openModal };
})();

const playerFactory = (role) => {
  const sayRole = () => console.log(`My role is ${role}`);
  return { sayRole };
};

const playerX = playerFactory("X");
const playerO = playerFactory("O");

