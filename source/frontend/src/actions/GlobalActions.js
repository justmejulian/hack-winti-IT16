import dispatcher from '../dispatcher';

export const exampleAction = param => {
  dispatcher.dispatch({
    type: 'ACTION_TYPE',
    payload: param
  });
};
