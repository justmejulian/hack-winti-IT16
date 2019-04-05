import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';

class GlobalStore extends EventEmitter {
  constructor() {
    super();
  }

  async handleActions(action) {
    switch (action.type) {
      case 'ACTION_TYPE':
        console.log(action.payload);
        this.emit('something_changed');
        break;
    }
  }
}

const globalStore = new GlobalStore();

dispatcher.register(globalStore.handleActions.bind(globalStore));

export default globalStore;
