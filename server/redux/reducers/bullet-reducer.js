const {Map} = require('immutable');

/* --------------- INITIAL STATE --------------- */

const initialState = Map({});

/* --------------- ACTIONS --------------- */

const ADD_BULLET = 'ADD_BULLET';
const REMOVE_BULLET = 'REMOVE_BULLET';

/* --------------- ACTION CREATORS --------------- */

const addBullet = bullet => {
  return {
    type: ADD_BULLET,
    bullet
  };
};

const removeBullet = bulletId => {
  return {
    type: REMOVE_BULLET,
    bulletId
  };
};

/* --------------- THUNK ACTION CREATORS --------------- */



/* --------------- REDUCER --------------- */

function bulletReducer(state = initialState, action) {
  switch (action.type) {

  case ADD_BULLET:
    return state.set(action.bullet.get('id'), action.bullet);

  case REMOVE_BULLET:
    return state.delete(action.bulletId);

  default:
    return state;
  }
}

module.exports = {
  ADD_BULLET,
  REMOVE_BULLET,
  bulletReducer
};
