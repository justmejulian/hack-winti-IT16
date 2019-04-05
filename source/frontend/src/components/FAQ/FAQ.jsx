import React, { Component } from 'react';

import './FAQ.sass';

class FAQ extends Component {
  state = {};

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    return <div className='FAG' />;
  }
}

export default FAQ;
