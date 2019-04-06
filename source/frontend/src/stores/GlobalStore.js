import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';

import * as api from '../adapter/apiAdapter';

class GlobalStore extends EventEmitter {
  constructor() {
    super();
  }

  async handleActions(action) {
    switch (action.type) {
      case 'REGISTER_USER':
        const registerUser = action.payload;
        const registerResponse = await api.registerUser(registerUser);
        this.emit('user_registered');
        break;
      case 'LOGIN_USER':
        const loginUser = action.payload;
        const loginResponse = await api.loginUser(loginUser);
        this.emit('user_logged_in');
        break;
    }
  }
}

const globalStore = new GlobalStore();

dispatcher.register(globalStore.handleActions.bind(globalStore));

export default globalStore;
