import React from "react";
import "./styles.scss";

class Header extends React.Component {
  render() {
    if (this.props.haveWinner) {
      return <h1>{`${this.props.playerName} WIN!`}</h1>;
    } else if (this.props.endGame) {
      return <h1>{"LOOKS LIKE IT'S DRAW"}</h1>;
    } else {
      return <h1>{"LET THE GAME BEGIN!"}</h1>;
    }
  }
}

export default Header;
