import React, { useEffect } from "react";
import Header from "../Header";
import Player from "../Player";
import Board from "../Board";
import "./styles.scss";

const initialState = {
  turn: 0,
  boardCells: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  haveWinner: false,
  winner: false,
  endGame: false,
};

function reducer(state, action) {
  console.log(action.type);

  const { type, payload } = action;

  switch (type) {
    case "UPDATE_TURN":
      return {
        ...state,
        turn: state.turn + 1,
        boardCells: payload,
      };
    case "HAVE_WINNER":
      return {
        ...state,
        haveWinner: true,
        endGame: true,
        winner: payload,
      };
    case "END_GAME":
      return {
        ...state,
        endGame: true,
      };
    case "RESET_GAME":
      return {
        ...state,
        boardCells: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        turn: 0,
        haveWinner: false,
        endGame: false,
        winner: false,
      };
    default:
      return state;
  }
}

function AppHook() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { endGame, haveWinner, winner, turn, boardCells } = state;
  const endGameRef = React.useRef();

  const onClickBoardItem = (positionOfItem) => {
    let newBoardCells = boardCells;

    if (newBoardCells[positionOfItem] === 0 && !state.endGame) {
      let currentTurn = state.turn;
      let currentPlayer = currentTurn % 2 === 0 ? 1 : 2;

      if (currentTurn % 2 === 0) {
        newBoardCells[positionOfItem] = 1;
      } else {
        newBoardCells[positionOfItem] = 2;
      }

      dispatch({
        type: "UPDATE_TURN",
        payload: newBoardCells,
      });

      let isThereAWinner = checkWinner(newBoardCells);
      let isEndGame = checkEndGame(newBoardCells);

      if (isThereAWinner) {
        dispatch({
          type: "HAVE_WINNER",
          payload: currentPlayer,
        });
      } else if (isEndGame) {
        dispatch({
          type: "END_GAME",
        });
      }
    }
  };

  const checkEndGame = (boardCells) => {
    /**
     * "some" check that at least one value is equal 0
     * so if that's true the game must go on
     *  otherwise the game is finished
     */
    if (boardCells.some((cell) => cell === 0)) {
      return false;
    } else {
      return true;
    }
  };

  const checkWinner = (boardCells) => {
    if (
      boardCells[0] !== 0 &&
      boardCells[0] === boardCells[1] &&
      boardCells[1] === boardCells[2]
    ) {
      return true;
    }

    if (
      boardCells[3] !== 0 &&
      boardCells[3] === boardCells[4] &&
      boardCells[4] === boardCells[5]
    ) {
      return true;
    }

    if (
      boardCells[6] !== 0 &&
      boardCells[6] === boardCells[7] &&
      boardCells[7] === boardCells[8]
    ) {
      return true;
    }

    if (
      boardCells[0] !== 0 &&
      boardCells[0] === boardCells[3] &&
      boardCells[3] === boardCells[6]
    ) {
      return true;
    }

    if (
      boardCells[1] !== 0 &&
      boardCells[1] === boardCells[4] &&
      boardCells[4] === boardCells[7]
    ) {
      return true;
    }

    if (
      boardCells[2] !== 0 &&
      boardCells[2] === boardCells[5] &&
      boardCells[5] === boardCells[8]
    ) {
      return true;
    }

    if (
      boardCells[0] !== 0 &&
      boardCells[0] === boardCells[4] &&
      boardCells[4] === boardCells[8]
    ) {
      return true;
    }

    if (
      boardCells[2] !== 0 &&
      boardCells[2] === boardCells[4] &&
      boardCells[4] === boardCells[6]
    ) {
      return true;
    }

    return false;
  };

  /**
   * It could be useful to put the following snippet right after the constructor,
   * so when you open the file, it will be one of the first info about the code
   */
  const onClickAnyKeyboardKeys = () => {
    if (endGameRef.current) {
      dispatch({
        type: "RESET_GAME",
      });
    }
  };

  useEffect(() => {
    endGameRef.current = endGame;
  }, [endGame]);

  useEffect(() => {
    window.addEventListener("keydown", onClickAnyKeyboardKeys);
    return () => {
      window.removeEventListener("keydown", onClickAnyKeyboardKeys);
    };
    /**in the following line it's confirmed that external elements (document) have been used within the function*/
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header
        endGame={endGame}
        haveWinner={haveWinner}
        playerName={
          winner === 1 ? "Player 1" : winner === 2 ? "Player 2" : null
        }
      />
      <div className="container">
        <Player
          isFirstPlayer={true}
          playerName={"Player 1"}
          isYourTurn={turn % 2 === 0}
          endGame={endGame}
        />
        <Board
          boardCells={boardCells}
          endGame={endGame}
          haveWinner={haveWinner}
          onClickBoardItem={onClickBoardItem}
        />
        <Player
          isFirstPlayer={false}
          playerName={"Player 2"}
          isYourTurn={turn % 2 !== 0}
          endGame={endGame}
        />
      </div>
    </div>
  );
}

export default AppHook;
