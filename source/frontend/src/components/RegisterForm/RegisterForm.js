import React, { Component } from 'react';
import './RegisterForm.css';

import TextField from '@material-ui/core/TextField';

class RegisterForm extends Component {
  state = {};
  render() {
    return (
      <div className="RegisterForm">
        <TextField
          id="outlined-email-input"
          label="Username"
          className="TextField"
          type="email"
          name="email"
          autoComplete="email"
          margin="normal"
          variant="outlined"
        />

        <TextField
          id="outlined-email-input"
          label="Password"
          className="TextField"
          type="password"
          name="password"
          autoComplete="password"
          margin="normal"
          variant="outlined"
        />

        <TextField
          id="outlined-email-input"
          label="RepeatPassword"
          className="TextField"
          type="password"
          name="repeatPassword"
          autoComplete="password"
          margin="normal"
          variant="outlined"
        />
      </div>
    );
  }
}

export default RegisterForm;
