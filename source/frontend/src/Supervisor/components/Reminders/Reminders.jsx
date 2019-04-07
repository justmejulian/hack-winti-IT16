import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './Reminders.sass';

import io from 'socket.io-client';
import globalStore from '../../../Shared/stores/GlobalStore';

import { B_URL } from '../../../config';

class Reminders extends Component {
  state = {
    eventname: '',
    detail: '',
    date: '',
    time: '',
    socket: io(B_URL)
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
          //TODO: show duys modal with setState
        }, 10000);
      });
    });
  }

  handleInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleCreate = () => {
    const challenge = {
      eventname: this.state.eventname,
      detail: this.state.detail,
      date: this.state.date,
      time: this.state.time
    };
    this.state.socket.emit('challenge', {
      type: globalStore.userType,
      challenge: challenge
    });
  };

  render() {
    const { eventname, info } = this.state;
    return (
      <div className="Reminders">
        <h1>Reminders</h1>
        <div className="Reminders-Questions">
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className="heading">
                Mike Interview 8.04.19 12:00
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                Mike needs to be at Technopark in Winterthur at 13. Docs: CV,
                Reports
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className="heading">
                John Interview 17.07.19 7:00
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                Mike needs to be at TCI in Zurich at 8. Suit is a must. Docs: CV
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className="heading">
                Daniel Daily Morning Wake up / Checkin 7:00
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>Daniel can't miss one more day of school.</Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <h1>Create new Event</h1>
          <div className="ReminderForm">
            <TextField
              label="Event Name"
              className="TextField"
              type="user"
              autoComplete="user"
              margin="normal"
              variant="outlined"
              name="eventname"
              value={eventname}
              onChange={this.handleInput}
            />
            <TextField
              label="More Info"
              className="TextField"
              type="text"
              name="detail"
              margin="normal"
              variant="outlined"
              value={info}
              onChange={this.handleInput}
            />
            <TextField
              label="Date"
              className="TextField"
              type="text"
              name="date"
              margin="normal"
              variant="outlined"
              value={info}
              onChange={this.handleInput}
            />
            <TextField
              label="Time"
              className="TextField"
              type="text"
              name="time"
              margin="normal"
              variant="outlined"
              value={info}
              onChange={this.handleInput}
            />
          </div>
          <Button variant="outlined" x onClick={this.handleCreate}>
            Create Event
          </Button>
        </div>
      </div>
    );
  }
}

export default Reminders;
