import React, { Component } from 'react';

import LoginForm from '../LoginForm/LoginForm';

import { Redirect } from 'react-router-dom';

import './Home.sass';

class Home extends Component {
  state = {};

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    if (this.state.loggedIn) {
      return <Redirect to='/LoginForm' />;
    }
    return (
      <div className='Home'>
        <h1>Home</h1>
      </div>
    );
  }
}

export default Home;
