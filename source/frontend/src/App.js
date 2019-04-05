import React, { Component } from 'react';
import './App.sass';
import 'typeface-roboto';

import history from './history';

import { Router, Route } from 'react-router-dom';

import SimpleAppBar from './components/SimpleAppBar/SimpleAppBar';
import BottomNav from './components/BottomNav/BottomNav';

import Home from './components/Home/Home';
import Game from './components/Game/Game';
import FAQ from './components/FAQ/FAQ';
import Chat from './components/Chat/Chat';
import RegisterForm from './components/RegisterForm/RegisterForm';
import LoginForm from './components/LoginForm/LoginForm';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <SimpleAppBar />
        <Router history={history}>
          <Route exact path='/' component={Home} />
          <Route exact path='/faq' component={FAQ} />
          <Route exact path='/chat' component={Chat} />
          <Route exact path='/game' component={Game} />
        </Router>
        <BottomNav />
      </div>
    );
  }
}

export default App;
