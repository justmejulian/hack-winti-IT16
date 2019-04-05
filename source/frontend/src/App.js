import React, { Component } from 'react';
import './App.sass';
import 'typeface-roboto';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import SimpleAppBar from './components/SimpleAppBar/SimpleAppBar';
import BottomNav from './components/BottomNav/BottomNav';

import Home from './components/Home/Home';
import Game from './components/Game/Game';
import FAQ from './components/FAQ/FAQ';
import Chat from './components/Chat/Chat';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <SimpleAppBar />
        <Router>
          <Route exact path='/' component={Home} />
          <Route path='/faq' component={FAQ} />
          <Route path='/chat' component={Chat} />
          <Route path='/game' component={Game} />
        </Router>
        <BottomNav />
      </div>
    );
  }
}

export default App;
