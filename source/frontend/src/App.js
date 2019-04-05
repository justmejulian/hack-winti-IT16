import React, { Component } from 'react';
import './App.sass';
import 'typeface-roboto';

import SimpleAppBar from './components/SimpleAppBar/SimpleAppBar';
import BottomNav from './components/BottomNav/BottomNav';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <SimpleAppBar />
        {/* <AppContent /> */}
        <BottomNav />
      </div>
    );
  }
}

export default App;
