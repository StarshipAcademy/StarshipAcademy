const {Map} = require('immutable');

/* --------------- INITIAL STATE --------------- */

const initialState = Map({});

/* --------------- ACTIONS --------------- */

const ADD_ASTEROID = 'ADD_ASTEROID';
const REMOVE_ASTEROID = 'REMOVE_ASTEROID';

/* --------------- ACTION CREATORS --------------- */

const addAsteroid = asteroid => {
  return {
    type: ADD_ASTEROID,
    asteroid
  };
};

const removeAsteroid = asteroidId => {
  return {
    type: REMOVE_ASTEROID,
    asteroidId
  };
};

/* --------------- THUNK ACTION CREATORS --------------- */



/* --------------- REDUCER --------------- */

function asteroidReducer(state = initialState, action) {
  switch (action.type) {

  case ADD_ASTEROID:
    return state.set(action.asteroid.get('id'), action.asteroid);

  case REMOVE_ASTEROID:
    return state.delete(action.asteroidId);

  default:
    return state;
  }
}

module.exports = {
  ADD_ASTEROID,
  REMOVE_ASTEROID,
  asteroidReducer
};
