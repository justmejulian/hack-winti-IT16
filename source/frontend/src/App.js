import React, { Component } from 'react';
import './App.sass';

import SimpleAppBar from './components/SimpleAppBar/SimpleAppBar';
import BottomNav from './components/BottomNav/BottomNav';

import RegisterForm from './components/RegisterForm/RegisterForm';
import LoginForm from './components/LoginForm/LoginForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <LoginForm />
        {/* <RegisterForm /> */}
        {/* <SimpleAppBar /> */}
        {/* <AppContent /> */}
        {/* <BottomNav /> */}
      </div>
    );
  }
}

export default App;
