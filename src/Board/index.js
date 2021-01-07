import React from "react";
import "./styles.scss";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardCells: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      turn: 0,
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
