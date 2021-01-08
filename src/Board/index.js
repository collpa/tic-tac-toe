import React from "react";
import "./styles.scss";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardCells: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      turn: 0,
      haveWinner: false,
      endGame: false,
    };
  }

  onClickBoardItem(positionOfItem) {
    let newBoardCells = this.state.boardCells;

    if (newBoardCells[positionOfItem] === 0) {
      let currentTurn = this.state.turn;

      if (currentTurn % 2 === 0) {
        newBoardCells[positionOfItem] = 1;
      } else {
        newBoardCells[positionOfItem] = 2;
      }

      this.setState({
          boardCells: newBoardCells,
          turn: currentTurn + 1,
      });
      let isThereAWinner = this.checkWinner(newBoardCells);
      let isEndGame = this.checkEndGame(newBoardCells);

      if (isThereAWinner) {
        this.setState({
          haveWinner: true,
        });
      } else if (isEndGame) {
        this.setState({
          endGame: true,
        });
      }
    }
  }

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
      <div className="grid-board">
        {this.state.boardCells.map((cell, index) => {
          return (
            <div
              key={index}
              className={`grid-item  ${
                cell === 1
                  ? "grid-cross-one"
                  : cell === 2
                  ? "grid-nought-two"
                  : ""
              }`}
              onClick={() => this.onClickBoardItem(index)}
            ></div>
          );
        })}
      </div>
    );
  }
}

export default Board;
