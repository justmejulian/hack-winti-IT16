import React, { Component } from 'react';
import './App.sass';
import 'typeface-roboto';

import history from './history';

import { Router, Switch, Route, Redirect } from 'react-router-dom';

import SimpleAppBar from './components/SimpleAppBar/SimpleAppBar';
import BottomNav from './components/BottomNav/BottomNav';

import NotFoundContainer from './components/NotFoundContainer/NotFoundContainer';

import Home from './components/Home/Home';
import Game from './components/Game/Game';
import FAQ from './components/FAQ/FAQ';
import Chat from './components/Chat/Chat';
import RegisterForm from './components/RegisterForm/RegisterForm';
import LoginForm from './components/LoginForm/LoginForm';

class App extends Component {
  state = {
    loggedIn: false
  };

  render() {
    const SecretRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props =>
          this.state.loggedIn != '' ? (
            <div className={'App'}>
              <SimpleAppBar />
              <Component {...props} />
              <BottomNav />
            </div>
          ) : window.location.pathname == '/register' ? (
            <Route exact path='/register' component={RegisterForm} />
          ) : window.location.pathname != '/login' ? (
            <Redirect to='/login' />
          ) : (
            <Route exact path='/login' component={LoginForm} />
          )
        }
      />
    );
    return (
      <div className='App'>
        <Router history={history}>
          <Switch>
            <SecretRoute exact path='/' component={Home} />
            <SecretRoute exact path='/faq' component={FAQ} />
            <SecretRoute exact path='/chat' component={Chat} />
            <SecretRoute exact path='/game' component={Game} />
            <SecretRoute component={NotFoundContainer} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
