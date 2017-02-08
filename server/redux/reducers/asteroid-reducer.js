const {Map} = require('immutable');
const {createAsteroid} = require('../../utils.js');

/* --------------- INITIAL STATE --------------- */

const initialState = Map({});

/* --------------- ACTIONS --------------- */

const ADD_ASTEROID = 'ADD_ASTEROID';
const REMOVE_ASTEROID = 'REMOVE_ASTEROID';

/* --------------- ACTION CREATORS --------------- */

const addAsteroid = asteroid => {
  // console.log('in add asteroid')
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

const seedAsteroids = () => {
  return dispatch => {
    console.log('############## in seed function')
    for (var i = 0; i < 300; i++) {
      // console.log('############## in seed function loop')
      dispatch(addAsteroid(createAsteroid()))
    }
  };
};

/* --------------- REDUCER --------------- */

function asteroidReducer(state = initialState, action) {
  switch (action.type) {

  case ADD_ASTEROID:
    return state.set(action.asteroid.id, action.asteroid);

  case REMOVE_ASTEROID:
    return state.delete(action.asteroidId);

  default:
    return state;
  }
}

module.exports = {
  ADD_ASTEROID,
  REMOVE_ASTEROID,
  addAsteroid,
  removeAsteroid,
  seedAsteroids,
  asteroidReducer
};
