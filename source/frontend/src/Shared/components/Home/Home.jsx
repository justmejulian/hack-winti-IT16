import React, { Component } from 'react';

import './Home.sass';

class Home extends Component {
  state = {};

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    return (
      <div className={'Home ' + this.props.className}>
        <h1>Home</h1>
      </div>
    );
  }
}

export default Home;
