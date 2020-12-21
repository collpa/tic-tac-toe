import React from "react";
import "./styles.scss";

class Player extends React.Component {
  render() {
    const { isFirst } = this.props;
    return (
      <div>
        <p className={isFirst ? "first" : "second"}>
          {isFirst ? "Player1" : "Player2"}
        </p>
      </div>
    );
  }
}

export default Player;
