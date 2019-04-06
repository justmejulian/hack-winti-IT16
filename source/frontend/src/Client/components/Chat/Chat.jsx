import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import io from 'socket.io-client';
import globalStore from '../../../Shared/stores/GlobalStore';

import './Chat.sass';

const ChatBubble = ({ user, message }) => {
  const bubbleOwner = user === 'me' ? 'blue-chat-bubble' : 'white-chat-bubble';
  return <span className={bubbleOwner}>{message}</span>;
};

const ChatInput = ({ value, onChange, onClick }) => {
  return (
    <div className="bottom-chat-input">
      <TextField
        className="MessageInput"
        name="message"
        autoComplete="user"
        margin="normal"
        variant="outlined"
        value={value}
        onChange={e => onChange(e)}
      />
      <Button
        variant="outlined"
        className="bottom-chat-submit-button"
        onClick={() => onClick()}
      >
        submit
      </Button>
    </div>
  );
};
class Chat extends Component {
  messages = [
    { mid: '1', user: 'supervisor', message: 'Hey' },
    { mid: '2', user: 'supervisor', message: 'How are you today?' },
    {
      mid: '3',
      user: 'supervisor',
      message: `Don't forget your appointment at 2 o'clock`
    }
  ];

  state = {
    messages: this.messages,
    chatInput: '',
    socket: io('http://localhost:8080')
  };

  componentDidMount() {
    this.state.socket.on('connect', socket => {
      console.log(globalStore.userType);
      this.state.socket.emit('join', { type: globalStore.userType });
      this.state.socket.on('getMsg', data => {
        console.log('message:', data);
      });
    });
  }

  handleInputChange = e => {
    this.setState({ chatInput: e.target.value });
  };

  submitChatInput = () => {
    if (!this.state.chatInput) {
      return;
    }
    const newMessage = {
      user: globalStore.uuid,
      message: this.state.chatInput
    };
    this.state.socket.emit('message', {
      type: globalStore.userType,
      message: newMessage
    });
    this.setState(prevState => ({
      chatInput: '',
      messages: [...prevState.messages, newMessage]
    }));
  };

  render() {
    return (
      <div className="Chat">
        <h1>Chat</h1>
        <div className="chat-messages">
          {this.state.messages.map(m => (
            <ChatBubble key={m.mid} user={m.user} message={m.message} />
          ))}
        </div>

        <ChatInput
          value={this.state.chatInput}
          onChange={this.handleInputChange}
          onClick={this.submitChatInput}
        />
      </div>
    );
  }
}

export default Chat;
