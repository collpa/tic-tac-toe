import React from "react";
import "./styles.scss";

class Board extends React.Component {
  render() {
    return (
      <div className="grid-board">
        <div className="grid-item"></div>
        <div className="grid-item"></div>
        <div className="grid-item"></div>
        <div className="grid-item"></div>
        <div className="grid-item"></div>
        <div className="grid-item"></div>
        <div className="grid-item"></div>
        <div className="grid-item"></div>
        <div className="grid-item"></div>
      </div>
    );
  }
}

export default Board;
