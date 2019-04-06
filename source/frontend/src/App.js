import React, { Component } from 'react';
import './App.sass';
import 'typeface-roboto';

import history from './Shared/history';

import globalStore from './Shared/stores/GlobalStore';
import { loginAction } from './Shared/actions/GlobalActions';

import { Router, Switch, Route, Redirect } from 'react-router-dom';

import SupervisorSimpleAppBar from './Supervisor/components/SimpleAppBar/SimpleAppBar';
import Sidebar from './Supervisor/components/Sidebar/Sidebar';

import SimpleAppBar from './Client/components/SimpleAppBar/SimpleAppBar';
import BottomNav from './Client/components/BottomNav/BottomNav';

import NotFoundContainer from './Supervisor/components/NotFoundContainer/NotFoundContainer';

import Home from './Shared/components/Home/Home';

import Game from './Client/components/Game/Game';
import FAQ from './Client/components/FAQ/FAQ';
import Chat from './Client/components/Chat/Chat';

import RegisterForm from './Shared/components/RegisterForm/RegisterForm';
import LoginForm from './Shared/components/LoginForm/LoginForm';

class App extends Component {
  state = {
    loggedIn: globalStore.loggedIn,
    userType: ''
  };

  componentWillMount() {
    globalStore.on('user_logged_in', this.login);
  }

  componentWillUnmount() {
    globalStore.removeListener('user_logged_in', this.login);
  }

  login = () => {
    this.setState({
      loggedIn: globalStore.loggedIn,
      userType: globalStore.userType
    });
  };

  render() {
    console.log(this.state.loggedIn);

    const SecretRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props =>
          this.state.loggedIn != '' ? (
            this.state.userType === 'client' ? (
              <div className={'App Client'}>
                <SimpleAppBar />
                <Component {...props} />
                <BottomNav />
              </div>
            ) : (
              <div className={'App Supervisor'}>
                <SimpleAppBar title='Social Helper' />
                <Sidebar />
                <Component {...props} className='content' />
              </div>
            )
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
      <Router history={history}>
        <Switch>
          <SecretRoute exact path='/' component={Home} />
          <SecretRoute exact path='/faq' component={FAQ} />
          <SecretRoute exact path='/chat' component={Chat} />
          <SecretRoute exact path='/game' component={Game} />
          <SecretRoute component={NotFoundContainer} />
        </Switch>
      </Router>
    );
  }
}

export default App;
