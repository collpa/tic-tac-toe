import React from "react";
import "./styles.scss";

class Board extends React.Component {
  render() {
    return (
      /**
       * <></> or <React.Fragment></React.Fragment> group a list of children
       * without adding extra nodes to the DOM
       */
      <>
        {this.props.haveWinner && <h1>Winner</h1>}
        {this.props.endGame && <h1>Draw</h1>}
        <div className="grid-board">
          {this.props.boardCells.map((cell, index) => {
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
                onClick={() => this.props.onClickBoardItem(index)}
              ></div>
            );
          })}
        </div>
      </>
    );
  }
}

export default Board;
