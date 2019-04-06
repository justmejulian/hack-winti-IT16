import React, { Component } from 'react';

import './Home.sass';

import globalStore from '../../../Shared/stores/GlobalStore';

class Home extends Component {
  state = {
    loggedIn: false,
    socket: io('http://localhost:8080')
  };

  componentDidMount() {
    // const socket = io('http://localhost:8080');
    this.state.socket.on('connect', data => {
      console.log(globalStore.userType);
      this.state.socket.emit('join', { type: globalStore.userType });
    });
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleSend = () => {
    console.log('handleSend called');
    this.state.socket.emit('message', {
      type: globalStore.userType,
      message: 'Hello from client'
    });
  };

  render() {
    return (
      <div className="Home">
        <h1 onClick={this.handleSend}>Home - Client</h1>
        <span onClick={this.handleSend}>Testmessage</span>
      </div>
    );
  }
}

export default Home;
