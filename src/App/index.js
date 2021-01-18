import React, { useEffect } from "react";
import Header from "../Header";
import Player from "../Player";
import Board from "../Board";
import "./styles.scss";

function AppHook() {
  const [boardCells, setBoardCells] = React.useState([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
  ]);
  const [turn, setTurn] = React.useState(10);
  const [haveWinner, setHaveWinner] = React.useState(false);
  const [winner, setWinner] = React.useState(0);
  const [endGame, setEndGame] = React.useState(false);
  const endGameRef = React.useRef();

  const onClickBoardItem = (positionOfItem) => {
    let newBoardCells = boardCells;

    if (newBoardCells[positionOfItem] === 0 && !endGame) {
      let currentTurn = turn;
      let currentPlayer = currentTurn % 2 === 0 ? 1 : 2;

      if (currentTurn % 2 === 0) {
        newBoardCells[positionOfItem] = 1;
      } else {
        newBoardCells[positionOfItem] = 2;
      }

      /**
       * FUN FACT
       * the 2nd parameter of a setState is a "callback"
       * allows a function to call another function
       * when the setState has finished changing the state
       */
      setBoardCells(newBoardCells);
      setTurn(currentTurn + 1);

      let isThereAWinner = checkWinner(newBoardCells);
      let isEndGame = checkEndGame(newBoardCells);

      if (isThereAWinner) {
        setHaveWinner(true);
        setWinner(currentPlayer);
        console.log("entrato");
        setEndGame(true);
      } else if (isEndGame) {
        setEndGame(true);
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
      setBoardCells([0, 0, 0, 0, 0, 0, 0, 0, 0]);
      setTurn(0);
      setHaveWinner(false);
      setEndGame(false);
      setWinner(0);
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

const mapStateToProps = (state) => ({
  boardCells: state.boardCells,
  turn: state.turn,
  haveWinner: state.haveWinner,
  winner: state.winner,
  endGame: state.endGame,
});

const mapDispatchToProps = (dispatch) => ({
  updateTurnRedux: () => dispatch(updateTurn),
  resetGameRedux: () => dispatch(resetGame),
  haveWinnerRedux: () => dispatch(haveWinner),
  endGameRedux: () => dispatch(endGame),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppHook);
