import React, { Component } from 'react';
import './App.css';

import SimpleAppBar from './components/SimpleAppBar/SimpleAppBar';
import BottomNav from './components/BottomNav/BottomNav';

import RegisterForm from './components/RegisterForm/RegisterForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <RegisterForm />
        {/* <SimpleAppBar /> */}
        {/* <AppContent /> */}
        {/* <BottomNav /> */}
      </div>
    );
  }
}

export default App;
