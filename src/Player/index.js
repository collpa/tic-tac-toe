import React from "react";
import "./styles.scss";

class Player extends React.Component {
  render() {
    const { isFirstPlayer, isYourTurn, playerName } = this.props;
    return (
      <div className={`${isFirstPlayer ? "first" : "second"} container-player`}>
        <p>{playerName}</p>

        {isYourTurn && (
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
