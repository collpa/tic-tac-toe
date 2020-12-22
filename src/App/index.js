import React from "react";
import Header from "../Header";
import Player from "../Player";
import Board from "../Board";
import "./styles.scss";

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <Player
            isFirstPlayer={true}
            playerName={"Player 1"}
            isYourTurn={true}
          />
          <Board />
          <Player
            isFirstPlayer={false}
            playerName={"Player 2"}
            isYourTurn={true}
          />
        </div>
      </div>
    );
  }
}

export default App;
