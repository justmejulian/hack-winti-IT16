import React, { Component } from 'react';

import './Sidebar.sass';

import globalStore from '../../../Shared/stores/GlobalStore';
import { logoutAction } from '../../../Shared/actions/GlobalActions';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

import VideogameAsset from '@material-ui/icons/VideogameAsset';
import Chat from '@material-ui/icons/Chat';
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';
import Home from '@material-ui/icons/Home';

class Sidebar extends Component {
  state = {};

  handleLogout = event => {
    logoutAction();
  };

  render() {
    return (
      <div className='Sidebar'>
        <List>
          <ListItem button>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary='Home' />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <SupervisorAccount />
            </ListItemIcon>
            <ListItemText primary='Clients' />
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
