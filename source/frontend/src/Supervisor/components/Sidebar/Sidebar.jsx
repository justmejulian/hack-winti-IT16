import React, { Component } from 'react';

import './Sidebar.sass';

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

  handleChange = (event, value) => {
    this.setState({ value });
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
            <ListItemText primary='FAQ' />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Chat />
            </ListItemIcon>
            <ListItemText primary='Chats' />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <VideogameAsset />
            </ListItemIcon>
            <ListItemText primary='Game' />
          </ListItem>
        </List>
        <Button variant='outlined'>Logout</Button>
      </div>
    );
  }
}

export default Sidebar;
