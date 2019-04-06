import React, { Component } from 'react';

import './FAQ.sass';

class FAQ extends Component {
  state = {};

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    return (
      <div className='FAQ'>
        <h1>FAQ</h1>
      </div>
    );
  }
}

export default FAQ;
