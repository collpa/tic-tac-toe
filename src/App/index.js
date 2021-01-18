import React, { useEffect } from "react";
import Header from "../Header";
import Player from "../Player";
import Board from "../Board";
import "./styles.scss";
import { connect } from "react-redux";
import {
  endGame,
  haveWinner,
  resetGame,
  updateTurn,
} from "../redux/actions/actions";

function AppHook(props) {
  const endGameRef = React.useRef();
  const { boardCells, turn, haveWinner, winner, endGame } = props;

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
      props.updateTurnRedux(newBoardCells);

      let isThereAWinner = checkWinner(newBoardCells);
      let isEndGame = checkEndGame(newBoardCells);

      if (isThereAWinner) {
        props.haveWinnerRedux(currentPlayer);
      } else if (isEndGame) {
        props.endGameRedux();
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
      props.resetGameRedux();
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
  updateTurnRedux: (payload) => dispatch(updateTurn(payload)),
  resetGameRedux: () => dispatch(resetGame),
  haveWinnerRedux: (payload) => dispatch(haveWinner(payload)),
  endGameRedux: () => dispatch(endGame),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppHook);
