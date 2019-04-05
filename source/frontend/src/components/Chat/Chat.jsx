import React, { Component } from 'react';

import './Chat.sass';

class Chat extends Component {
  state = {};

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    return (
      <div className='FAG'>
        <h1>Chat</h1>
      </div>
    );
  }
}

export default Chat;
