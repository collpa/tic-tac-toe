import React from "react";
import "./styles.scss";

class Player extends React.Component {
  render() {
    const { isFirstPlayer, isYourTurn, playerName } = this.props;
    return (
      <div>
        <p className={isFirstPlayer ? "first" : "second"}>{playerName}</p>
        {isYourTurn && <p>YOUR TURN MATE!</p>}
      </div>
    );
  }
}

export default Player;
