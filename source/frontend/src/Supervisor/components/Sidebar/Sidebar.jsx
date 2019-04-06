import React, { Component } from 'react';

import './Sidebar.sass';

import globalStore from '../../../Shared/stores/GlobalStore';
import { logoutAction } from '../../../Shared/actions/GlobalActions';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

import history from '../../../Shared/history';

import Event from '@material-ui/icons/Event';
import ChatIcon from '@material-ui/icons/Chat';
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';
import Home from '@material-ui/icons/Home';

class Sidebar extends Component {
  state = {};

  handleLogout = event => {
    logoutAction();
  };

  updateViewState = value => {
    console.log(value);
    this.setState({ value });
    // eslint-disable-next-line default-case
    switch (value) {
      case 0:
        history.push('/');
        break;
      case 1:
        history.push('/reminder');
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
    return (
      <div className='Sidebar'>
        <List>
          <ListItem button onClick={() => this.updateViewState(0)}>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary='Home' />
          </ListItem>
          <ListItem button onClick={() => this.updateViewState(2)}>
            <ListItemIcon>
              <ChatIcon />
            </ListItemIcon>
            <ListItemText primary='Chats' />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <SupervisorAccount />
            </ListItemIcon>
            <ListItemText primary='Manage Clients' />
          </ListItem>
          <ListItem button onClick={() => this.updateViewState(1)}>
            <ListItemIcon>
              <Event />
            </ListItemIcon>
            <ListItemText primary='Reminders' />
          </ListItem>
        </List>
        <Button variant='outlined' onClick={this.handleLogout}>
          Logout
        </Button>
      </div>
    );
  }
}

export default Sidebar;
