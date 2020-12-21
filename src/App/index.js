import React from "react";
import "./styles.scss";
import Header from "../Header";
import Player from "../Player";

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div>
          <Player />
        </div>
      </div>
    );
  }
}

export default App;
