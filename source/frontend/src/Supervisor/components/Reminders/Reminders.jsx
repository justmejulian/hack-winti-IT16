import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './Reminders.sass';

class Reminders extends Component {
  state = {};

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { eventname, info } = this.state;
    return (
      <div className='Reminders'>
        <h1>Reminders</h1>
        <div className='Reminders-Questions'>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className='heading'>
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
              <Typography className='heading'>
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
              <Typography className='heading'>
                Daniel Daily Morning Wake up / Checkin 7:00
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>Daniel can't miss one more day of school.</Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <h1>Create new Event</h1>
          <div className='ReminderForm'>
            <TextField
              label='Event Name'
              className='TextField'
              type='user'
              autoComplete='user'
              margin='normal'
              variant='outlined'
              name='eventname'
              value={eventname}
              onChange={this.handleInput}
            />
            <TextField
              label='More Info'
              className='TextField'
              type='text'
              name='info'
              margin='normal'
              variant='outlined'
              value={info}
              onChange={this.handleInput}
            />
            <TextField
              label='Date'
              className='TextField'
              type='text'
              name='info'
              margin='normal'
              variant='outlined'
              value={info}
              onChange={this.handleInput}
            />
            <TextField
              label='Time'
              className='TextField'
              type='text'
              name='info'
              margin='normal'
              variant='outlined'
              value={info}
              onChange={this.handleInput}
            />
          </div>
          <Button variant='outlined' x onClick={this.handleLogin}>
            Create Event
          </Button>
        </div>
      </div>
    );
  }
}

export default Reminders;
