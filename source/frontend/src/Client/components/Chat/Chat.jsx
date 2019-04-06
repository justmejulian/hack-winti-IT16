import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import './Chat.sass';

const ChatBubble = ({ user, message }) => {
  const bubbleOwner = user === 'me' ? 'blue-chat-bubble' : 'white-chat-bubble';
  return <span className={bubbleOwner}>{message}</span>;
};

const ChatInput = ({ value, onChange, onClick }) => {
  return (
    <div className='bottom-chat-input'>
      <TextField
        className='MessageInput'
        name='message'
        autoComplete='user'
        margin='normal'
        variant='outlined'
        value={value}
        onChange={e => onChange(e)}
      />
      <Button
        variant='outlined'
        className='bottom-chat-submit-button'
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

  state = { messages: this.messages, chatInput: '' };

  handleInputChange = e => {
    this.setState({ chatInput: e.target.value });
  };

  submitChatInput = () => {
    const newMessage = { user: 'me', message: this.state.chatInput };
    this.setState(prevState => ({
      chatInput: '',
      messages: [...prevState.messages, newMessage]
    }));
  };

  render() {
    return (
      <div className='Chat'>
        <h1>Chat</h1>
        <div className='chat-messages'>
          {this.state.messages.map(m => (
            <ChatBubble user={m.user} message={m.message} />
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
