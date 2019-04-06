import React, { Component } from 'react';

import './Home.sass';

import io from 'socket.io-client';

// import socket from '../../../socket';
import globalStore from '../../../Shared/stores/GlobalStore';

class Home extends Component {
  state = {
    loggedIn: false,
    socket: io('http://localhost:8080')
  };

  componentDidMount() {
    // const socket = io('http://localhost:8080');
    this.state.socket.on('connect', socket => {
      console.log(globalStore.userType);
      this.state.socket.emit('join', { type: globalStore.userType });
      this.state.socket.on('getMsg', data => {
        console.log('message:', data);
        alert('Message received');
      });
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
        <h1>Home</h1>
        <span onClick={this.handleSend}>Testmessage</span>
      </div>
    );
  }
}

export default Home;
