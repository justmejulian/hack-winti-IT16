import React, { Component } from 'react';
import './App.sass';
import 'typeface-roboto';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import SimpleAppBar from './components/SimpleAppBar/SimpleAppBar';
import BottomNav from './components/BottomNav/BottomNav';

import FAQ from './components/FAQ/FAQ';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <SimpleAppBar />
        <Router>
          <Route exact path='/' component={FAQ} />
          <Route path='/about' component={FAQ} />
          <Route path='/topics' component={FAQ} />
        </Router>
        <BottomNav />
      </div>
    );
  }
}

export default App;
