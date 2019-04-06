import React, { Component } from 'react';

import './BottomNav.sass';

import history from '../../../Shared/history';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import VideogameAsset from '@material-ui/icons/VideogameAsset';
import Chat from '@material-ui/icons/Chat';
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';
import Home from '@material-ui/icons/Home';

class BottomNav extends Component {
  state = {
    value: 0
  };

  updateViewState = (event, value) => {
    this.setState({ value });
    // eslint-disable-next-line default-case
    switch (value) {
      case 0:
        history.push('/');
        break;
      case 1:
        history.push('/faq');
        break;
      case 2:
        history.push('/chat');
        break;
      case 3:
        history.push('/game');
        break;
    }
    //globalActions.setViewState(value);
  };

  render() {
    const { value } = this.state;

    return (
      <BottomNavigation
        value={value}
        onChange={this.updateViewState}
        showLabels
        className='BottomNav'
      >
        <BottomNavigationAction
          classes={{
            selected: 'BottomNavigationAction-selected'
          }}
          label='Home'
          icon={<Home />}
        />
        <BottomNavigationAction
          classes={{
            selected: 'BottomNavigationAction-selected'
          }}
          label='FAQ'
          icon={<SupervisorAccount />}
        />
        <BottomNavigationAction
          classes={{
            selected: 'BottomNavigationAction-selected'
          }}
          label='Chat'
          icon={<Chat />}
        />
        <BottomNavigationAction
          classes={{
            selected: 'BottomNavigationAction-selected'
          }}
          label='Game'
          icon={<VideogameAsset />}
        />
      </BottomNavigation>
    );
  }
}

export default BottomNav;
