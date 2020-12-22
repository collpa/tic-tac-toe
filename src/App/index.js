import React from "react";
import "./styles.scss";
import Header from "../Header";
import Player from "../Player";
import Board from "../Board";

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <Player isFirstPlayer={true} playerName={"Player 1"} />
          <Board />
          <Player isFirstPlayer={false} playerName={"Player 2"} />
        </div>
      </div>
    );
  }
}

export default App;
