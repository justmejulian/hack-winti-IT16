import React, { Component } from 'react';

import './SimpleAppBar.sass';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class SimpleAppBar extends Component {
  render() {
    return (
      <div className='SimpleAppBar'>
        <AppBar position='static' color='default'>
          <Toolbar>
            <Typography variant='h6' color='inherit'>
              App
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default SimpleAppBar;