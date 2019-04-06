import React, { Component } from 'react';
import './LoginForm.sass';

import history from '../../history';

import FormHeader from '../FormHeader/FormHeader';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import globalStore from '../../../Shared/stores/GlobalStore';
import { loginAction } from '../../../Shared/actions/GlobalActions';

class LoginForm extends Component {
  state = {
    username: 'Client',
    password: 'myPassword',
    authError: false
  };

  componentWillMount() {
    globalStore.on('user_logged_in', this.login);
  }

  componentWillUnmount() {
    globalStore.removeListener('user_logged_in', this.login);
  }

  login = () => {
    history.push('/');
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
    history.push('/register');
  };

  render() {
    const { username, password } = this.state;
    return (
      <div className='LoginForm'>
        <FormHeader />
        <TextField
          label='Username'
          classes={{
            root: 'TextField',
            focused: 'Input-focused'
          }}
          type='user'
          name='username'
          autoComplete='user'
          margin='normal'
          variant='outlined'
          value={username}
          onChange={this.handleInput}
        />
        <TextField
          label='Password'
          classes={{
            root: 'TextField',
            focused: 'Input-focused'
          }}
          type='password'
          name='password'
          autoComplete='password'
          margin='normal'
          variant='outlined'
          value={password}
          onChange={this.handleInput}
        />
        <Button
          variant='outlined'
          className='LoginButton'
          onClick={this.handleLogin}
        >
          Login
        </Button>
        {/* <Button
          variant='outlined'
          className='NewAccountButton'
          onClick={this.gotoRegister}
        >
          Create Account
        </Button> */}
      </div>
    );
  }
}

export default LoginForm;
