const {Map} = require('immutable');
const chai = require('chai');
const {expect} = require('chai');
const chaiImmutable = require('chai-immutable');

chai.use(chaiImmutable);

const {ADD_ASTEROID, REMOVE_ASTEROID, asteroidReducer} = require('./asteroid-reducer');

// set up 3 asteroids
const asteroid = Map({
  id: 'number1',
  type: 'octa',
  x: 0,
  y: 1.6,
  z: 5
});

const asteroid2 = Map({
  id: 'number2',
  type: 'asteroid1',
  x: 1,
  y: 1.6,
  z: 5
});

const asteroid3 = Map({
  id: 'number3',
  type: 'asteroid2',
  x: 2,
  y: 1.6,
  z: 5
});

const updatedAsteroid1Data = Map({
  id: 'number1',
  type: 'octa',
  x: 1,
  y: 2.6,
  z: 6
});

let emptyInitialState;
let populatedState;

// set up an empty initial state and a populated initial state
beforeEach(() => {
  emptyInitialState = Map({});

  populatedState = Map({
    'number1': asteroid,
    'number2': asteroid2
  });
});

describe('asteroidReducer', () => {
  it('adds an asteroid to an initial empty state of asteroids', () => {
    const action = {
      type: ADD_ASTEROID,
      asteroid: asteroid
    };

    const nextState = asteroidReducer(emptyInitialState, action);

    expect(nextState).to.equal(Map({
      'number1': Map({
        id: 'number1',
        type: 'octa',
        x: 0,
        y: 1.6,
        z: 5
      })
    }));
  });

  it('adds an asteroid to a populated state of asteroids', () => {
    const action = {
      type: ADD_ASTEROID,
      asteroid: asteroid3
    };

    const nextState = asteroidReducer(populatedState, action);

    expect(nextState).to.equal(Map({
      'number1': asteroid,
      'number2': asteroid2,
      'number3': Map({
        id: 'number3',
        type: 'asteroid2',
        x: 2,
        y: 1.6,
        z: 5
      })
    }));
  });

  it('removes an asteroid from a populated state', () => {
    const action = {
      type: REMOVE_ASTEROID,
      asteroidId: 'number1'
    };

    const nextState = asteroidReducer(populatedState, action);

    expect(nextState).to.equal(Map({
      'number2': asteroid2
    }));
  });

  it('returns initial empty state when action doesn\'t match', () => {
    const action = {
      type: 'SOMETHING_ELSE',
      asteroidId: 'number1'
    };

    const nextState = asteroidReducer(emptyInitialState, action);

    expect(nextState).to.equal(Map({}));
  });

  it('returns initial populated state when action doesn\'t match', () => {
    const action = {
      type: 'SOMETHING_ELSE',
      asteroidId: 'number1'
    };

    const nextState = asteroidReducer(populatedState, action);

    expect(nextState).to.equal(Map({
      'number1': asteroid,
      'number2': asteroid2
    }));
  });
});
