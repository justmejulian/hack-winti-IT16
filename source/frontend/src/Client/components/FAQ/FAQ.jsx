import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import './FAQ.sass';

class FAQ extends Component {
  state = {};

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    return (
      <div className="FAQ">
        <h1>FAQ</h1>
        <div className="FAQ-Questions">
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className="heading">Where do I find the chat to communicate with my social worker?</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                The chat is located in the navigation bar. Just click on the chat symbol.
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className="heading">What should I do if I want to talk to my social worker in person?</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                The best way is to call him/her and set up an appointment.
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className="heading">Do you have any further questions?</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                Just call the following number: +411234567
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </div>
    );
  }
}

export default FAQ;
