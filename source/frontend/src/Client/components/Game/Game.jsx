import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import AlarmIcon from '@material-ui/icons/Alarm';
import WorkIcon from '@material-ui/icons/Work';
import ClockIcon from '@material-ui/icons/WatchLater';
import Divider from '@material-ui/core/Divider';
import './Game.sass';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

class Game extends Component {
  state = {};

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    return (
      <div className="Game">
        <h1>Game</h1>
        <div className="Score">Your Score: 42</div>
        <List className={styles.root}>
          <ListItem>
            <Avatar>
              <AlarmIcon />
            </Avatar>
            <ListItemText
              primary="Woke up on time"
              secondary="April 5, 2019 | 8 Points"
            />
          </ListItem>
          <Divider />
          <ListItem>
            <Avatar>
              <WorkIcon />
            </Avatar>
            <ListItemText
              primary="Attended a job interview"
              secondary="April 2, 2019 | 22 Points"
            />
          </ListItem>
          <Divider />
          <ListItem>
            <Avatar>
              <ClockIcon />
            </Avatar>
            <ListItemText
              primary="Arrived on time"
              secondary="March 30, 2019 | 12 Points"
            />
          </ListItem>
          <Divider />
        </List>
      </div>
    );
  }
}

export default Game;
