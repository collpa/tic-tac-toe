import React from "react";
import Header from "../Header";
import Player from "../Player";
import Board from "../Board";
import "./styles.scss";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardCells: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      turn: 0,
      haveWinner: false,
      endGame: false,
      winner: 0,
    };
  }

  onClickBoardItem = (positionOfItem) => {
    let newBoardCells = this.state.boardCells;

    if (newBoardCells[positionOfItem] === 0) {
      let currentTurn = this.state.turn;
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
      this.setState({
        boardCells: newBoardCells,
        turn: currentTurn + 1,
      });

      let isThereAWinner = this.checkWinner(newBoardCells);
      let isEndGame = this.checkEndGame(newBoardCells);

      if (isThereAWinner) {
        this.setState({
          haveWinner: true,
          winner: currentPlayer,
        });
      } else if (isEndGame) {
        this.setState({
          endGame: true,
        });
      }
    }
  };

  checkWinner(boardCells) {
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
  }

  checkEndGame(boardCells) {
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
  }

  render() {
    return (
      <div>
        <Header
          endGame={this.state.endGame}
          haveWinner={this.state.haveWinner}
          playerName={
            this.state.winner === 1
              ? "Player 1"
              : this.state.winner === 2
              ? "Player 2"
              : null
          }
        />
        <div className="container">
          <Player
            isFirstPlayer={true}
            playerName={"Player 1"}
            isYourTurn={this.state.turn % 2 === 0}
          />
          <Board
            boardCells={this.state.boardCells}
            endGame={this.state.endGame}
            haveWinner={this.state.haveWinner}
            onClickBoardItem={this.onClickBoardItem}
          />
          <Player
            isFirstPlayer={false}
            playerName={"Player 2"}
            isYourTurn={this.state.turn % 2 !== 0}
          />
        </div>
      </div>
    );
  }
}

export default App;
