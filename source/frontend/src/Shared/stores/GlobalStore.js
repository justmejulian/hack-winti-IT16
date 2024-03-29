import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';

import jwtDecode from 'jwt-decode';

import * as api from '../adapter/apiAdapter';

class GlobalStore extends EventEmitter {
  constructor() {
    super();
    this.loggedIn = false;
    this.userType = '';
    this.username = '';
    this.uuid = '';
  }

  async handleActions(action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case 'REGISTER_USER':
        const registerUser = action.payload;
        const registerResponse = await api.registerUser(registerUser);
        this.emit('user_registered');
        break;
      case 'LOGIN_USER':
        const loginUser = action.payload;
        const loginResponse = await api.loginUser(loginUser);
        var decoded = jwtDecode(loginResponse.jwtToken);
        console.log('decoded loginResponse: ', decoded);

        this.loggedIn = true;

        this.username = decoded.username;
        this.uuid = decoded.uuid;
        this.userType = decoded.userType;
        // Todo: store in index db

        this.emit('user_logged_in');
        break;
      case 'LOGOUT_USER':
        this.loggedIn = false;

        this.username = '';
        this.uuid = '';
        // Todo: store in index db

        this.emit('user_logged_in');
        break;
    }
  }
}

const globalStore = new GlobalStore();

dispatcher.register(globalStore.handleActions.bind(globalStore));

export default globalStore;
