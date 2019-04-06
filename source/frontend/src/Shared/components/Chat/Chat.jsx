import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import history from '../../../Shared/history';

import RewardModal from '../../../Client/components/RewardModal/RewardModal';

import io from 'socket.io-client';
import globalStore from '../../../Shared/stores/GlobalStore';

import './Chat.sass';

const ChatBubble = ({ user, message }) => {
  console.log(user);
  const bubbleOwner =
    user.valueOf() === globalStore.uuid.valueOf()
      ? 'blue-chat-bubble'
      : 'white-chat-bubble';
  return <span className={bubbleOwner}>{message}</span>;
};

const ChatInput = ({ value, onChange, onClick, onKeyPress }) => {
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
        onKeyPress={e => onKeyPress(e)}
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
  state = {
    messages: [],
    chatInput: '',
    isModalVisible: false,
    socket: io('http://localhost:8080')
  };

  componentDidMount() {
    this.state.socket.on('connect', socket => {
      console.log(globalStore.userType);
      this.state.socket.emit('join', { type: globalStore.userType });
      this.state.socket.on('getMsg', data => {
        console.log('message:', data);
        this.setState(prevState => ({
          messages: [...prevState.messages, data]
        }));
      });
      this.state.socket.on('getChallenge', data => {
        console.log('challenge:', data);
        setTimeout(() => {
          this.setState({ values: data, isModalVisible: true });
        }, 10000);
      });
    });
  }

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.submitChatInput();
    }
  };

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

  handleCloseModal = () => {
    this.setState({ isModalVisible: false });
  };

  fowardToGame = () => {
    history.push('/game');
  };

  render() {
    return (
      <div className='Chat'>
        <RewardModal
          isVisible={this.state.isModalVisible}
          handleCloseModal={this.handleCloseModal}
          values={this.state.values}
          fowardToGame={this.fowardToGame}
        />
        <div className='chat-messages'>
          {this.state.messages.map(m => (
            <ChatBubble key={m.mid} user={m.user} message={m.message} />
          ))}
        </div>

        <ChatInput
          value={this.state.chatInput}
          onKeyPress={this.handleKeyPress}
          onChange={this.handleInputChange}
          onClick={this.submitChatInput}
        />
      </div>
    );
  }
}

export default Chat;
