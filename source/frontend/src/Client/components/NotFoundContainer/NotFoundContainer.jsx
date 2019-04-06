import React, { Component } from 'react';

import './NotFoundContainer.sass';

class NotFoundContainer extends Component {
  state = {};

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    return (
      <div className='NotFoundContainer'>
        <h1>NotFoundContainer</h1>
      </div>
    );
  }
}

export default NotFoundContainer;
