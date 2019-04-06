import React, { Component } from 'react';

import './Game.sass';

class Game extends Component {
  state = {};

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    return (
      <div className={'Game ' + this.props.className}>
        <h1>Game</h1>
      </div>
    );
  }
}

export default Game;