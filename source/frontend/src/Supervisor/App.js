import React, { Component } from 'react';
import './App.sass';
import 'typeface-roboto';

import history from '../Shared/history';

import globalStore from '../Shared/stores/GlobalStore';
import { loginAction } from '../Shared/actions/GlobalActions';

import { Router, Switch, Route, Redirect } from 'react-router-dom';

import SimpleAppBar from './components/SimpleAppBar/SimpleAppBar';
import Sidebar from './components/Sidebar/Sidebar';

import NotFoundContainer from './components/NotFoundContainer/NotFoundContainer';

import Home from './components/Home/Home';
import Game from './components/Game/Game';
import FAQ from './components/FAQ/FAQ';
import Chat from './components/Chat/Chat';
import RegisterForm from '../Shared/components/RegisterForm/RegisterForm';
import LoginForm from '../Shared/components/LoginForm/LoginForm';

class App extends Component {
  state = {
    loggedIn: globalStore.loggedIn
  };

  componentWillMount() {
    globalStore.on('user_logged_in', this.login);
  }

  componentWillUnmount() {
    globalStore.removeListener('user_logged_in', this.login);
  }

  login = () => {
    this.setState({
      loggedIn: globalStore.loggedIn
    });
  };

  render() {
    console.log(this.state.loggedIn);

    const SecretRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props =>
          this.state.loggedIn != '' ? (
            <div className={'App'}>
              <SimpleAppBar title='Social Helper' />
              <Sidebar />
              <Component {...props} className='content' />
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
      <div>
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
