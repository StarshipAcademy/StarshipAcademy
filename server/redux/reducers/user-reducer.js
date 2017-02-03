const {Map} = require('immutable');

const {createUser} = require('../../utils');

/* --------------- INITIAL STATE --------------- */

const initialState = Map({});

/* --------------- ACTIONS --------------- */

const ADD_USER = 'ADD_USER';
const UPDATE_USER = 'UPDATE_USER';
const REMOVE_USER = 'REMOVE_USER';

/* --------------- ACTION CREATORS --------------- */

const addUser = user => {
  return {
    type: ADD_USER,
    user
  };
};

const updateUser = userData => {
  return {
    type: UPDATE_USER,
    userData
  };
};

const removeUser = userId => {
  return {
    type: REMOVE_USER,
    userId
  };
};

/* --------------- THUNK ACTION CREATORS --------------- */

const createAndEmitUser = socket => {
  return dispatch => {
    const userId = socket.id;
    const user = Map(createUser(userId));
    dispatch(addUser(user));
    socket.on('sceneLoad', () => {
      socket.emit('createUser', user);
    });
  };
};

const updateUserData = userData => {
  return dispatch => {
    // userData.newBullets.forEach(bullet => {
    //   bullet.userId = userData.id;
    //   dispatch(addBullet(bullet));
    // });
    // userData.deadBullets.forEach(bullet => {
    //   dispatch(removeBullet(bullet));
    // });
    dispatch(updateUser(userData));
  };
};

const removeUserAndEmit = socket => {
  return dispatch => {
    const userId = socket.id;
    dispatch(removeUser(userId));
    socket.broadcast.emit('removeUser', userId);
  };
};

/* --------------- REDUCER --------------- */

function userReducer(state = initialState, action) {
  switch (action.type) {

  case ADD_USER:
    return state.set(action.user.get('id'), action.user);

  case UPDATE_USER:
    return state.mergeIn([action.userData.get('id')], action.userData);

  case REMOVE_USER:
    return state.delete(action.userId);

  default:
    return state;
  }
}

module.exports = {
  ADD_USER,
  UPDATE_USER,
  REMOVE_USER,
  createAndEmitUser,
  updateUserData,
  removeUserAndEmit,
  userReducer
};
