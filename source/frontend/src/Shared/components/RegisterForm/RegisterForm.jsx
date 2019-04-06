import React, { Component } from 'react';
import './RegisterForm.sass';

import history from '../../history';

import FormHeader from '../FormHeader/FormHeader';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import globalStore from '../../stores/GlobalStore';
import { registerAction } from '../../actions/GlobalActions';

class RegisterForm extends Component {
  state = {
    username: 'testUser',
    password: 'testPassword',
    passwordConfirm: 'testPassword',
    validationError: false
  };

  handleRegister = e => {
    e.preventDefault();
    const { username, password, passwordConfirm } = this.state;
    if (password.valueOf() == passwordConfirm.valueOf()) {
      const user = { username, password };
      registerAction(user);
      // Todo: not successful register
      history.push('/login');
    } else {
      this.setState({ validationError: true });
    }
  };

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { username, password, passwordConfirm } = this.state;
    return (
      <div className='RegisterForm'>
        <FormHeader />
        <TextField
          label='Username'
          className='TextField'
          type='user'
          name='userName'
          autoComplete='user'
          margin='normal'
          variant='outlined'
          value={username}
          onChange={this.handleInput}
        />
        <TextField
          label='Password'
          className='TextField'
          type='password'
          name='password'
          autoComplete='password'
          margin='normal'
          variant='outlined'
          value={password}
          onChange={this.handleInput}
        />
        <TextField
          label='Confirm Password'
          className='TextField'
          type='password'
          name='passwordConfirm'
          autoComplete='password'
          margin='normal'
          variant='outlined'
          value={passwordConfirm}
          onChange={this.handleInput}
        />
        <Button
          variant='outlined'
          className='RegisterButton'
          onClick={this.handleRegister}
        >
          Register
        </Button>
      </div>
    );
  }
}

export default RegisterForm;
