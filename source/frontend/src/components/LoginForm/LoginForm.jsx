import React, { Component } from 'react';
import './LoginForm.sass';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import globalStore from '../../stores/GlobalStore';
import { loginAction } from '../../actions/GlobalActions';

class LoginForm extends Component {
  state = {
    username: 'testUser',
    password: 'testPassword',
    authError: false
  };

  handleLogin = e => {
    e.preventDefault();
    const { username, password } = this.state;
    const user = { username, password };
    loginAction(user);
  };

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  gotoRegister = e => {
    //TODO
  };

  render() {
    const { username, password } = this.state;
    return (
      <div className="LoginForm">
        <TextField
          label="Username"
          className="TextField"
          type="user"
          name="username"
          autoComplete="user"
          margin="normal"
          variant="outlined"
          value={username}
          onChange={this.handleInput}
        />
        <TextField
          label="Password"
          className="TextField"
          type="password"
          name="password"
          autoComplete="password"
          margin="normal"
          variant="outlined"
          value={password}
          onChange={this.handleInput}
        />
        <Button
          variant="outlined"
          className="LoginButton"
          onClick={this.handleLogin}
        >
          Login
        </Button>
        <Button
          variant="outlined"
          className="NewAccountButton"
          onClick={this.gotoRegister}
        >
          Create Account
        </Button>
      </div>
    );
  }
}

export default LoginForm;