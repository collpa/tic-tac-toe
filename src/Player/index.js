import React from "react";
import "./styles.scss";

class Player extends React.Component {
  render() {
    const { isFirstPlayer, isYourTurn, playerName, endGame } = this.props;
    return (
      <div className={`${isFirstPlayer ? "first" : "second"} container-player`}>
        <p>{playerName}</p>

        {isYourTurn && !endGame && (
          <p
            className={
              isFirstPlayer ? "text-turn-player1" : "text-turn-player2"
            }
          >
            IT'S YOUR <br />
            TURN MATE!
          </p>
        )}
      </div>
    );
  }
}

export default Player;
