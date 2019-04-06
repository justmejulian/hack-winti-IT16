import React, { Component } from 'react';

import './FAQ.sass';

class FAQ extends Component {
  state = {};

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    return (
      <div className={'FAQ ' + this.props.className}>
        <h1>Test</h1>
      </div>
    );
  }
}

export default FAQ;
