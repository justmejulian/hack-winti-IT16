import React, { Component } from 'react';

import './Game.sass';
import RewardModal from '../RewardModal/RewardModal';

class Game extends Component {
  state = { rewardModalVisible: true };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  showRewardModal = () => {
    this.setState({ rewardModalVisible: true });
  };

  playFancyAnimation = () => {
    // do some fancy animation for collecting reward, then dismiss modal
    this.setState({ rewardModalVisible: false });
  };

  dismissRewardModal = () => {
    this.setState({ rewardModalVisible: false });
  };

  render() {
    return (
      <div className='Game'>
        <RewardModal
          visible={this.state.rewardModalVisible}
          playAnimation={this.playFancyAnimation}
          onClose={this.dismissRewardModal}
        />
        <h1>Game</h1>
      </div>
    );
  }
}

export default Game;
