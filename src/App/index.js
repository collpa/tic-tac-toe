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
        <div>
          <Player />
          <Board />
          <Player />
        </div>
      </div>
    );
  }
}

export default App;
