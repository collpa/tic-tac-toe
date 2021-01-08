import React from "react";
import "./styles.scss";

class Header extends React.Component {
  renderRestartGame() {
    if (this.props.endGame) {
      return <h3>Press any keys to reset the game!</h3>;
    }
  }

  renderTitle() {
    if (this.props.haveWinner) {
      return (
        <>
          <h1>{`${this.props.playerName} WIN!`}</h1>
        </>
      );
    } else if (this.props.endGame) {
      return (
        <>
          <h1>{"LOOKS LIKE IT'S DRAW"}</h1>
        </>
      );
    } else {
      return <h1>{"LET THE GAME BEGIN!"}</h1>;
    }
  }

  render() {
    return (
      <div className="header-container">
        {this.renderTitle()}
        {this.renderRestartGame()}
      </div>
    );
  }
}

export default Header;
