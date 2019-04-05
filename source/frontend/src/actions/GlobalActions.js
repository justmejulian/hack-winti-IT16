import dispatcher from '../dispatcher';

export const registerAction = user => {
  dispatcher.dispatch({
    type: 'REGISTER_USER',
    payload: user
  });
};

export const loginAction = user => {
  dispatcher.dispatch({
    type: 'LOGIN_USER',
    payload: user
  });
};
