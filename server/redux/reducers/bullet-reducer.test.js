const {Map} = require('immutable');
const chai = require('chai');
const {expect} = require('chai');
const chaiImmutable = require('chai-immutable');

chai.use(chaiImmutable);

const {ADD_BULLET, REMOVE_BULLET, bulletReducer} = require('./bullet-reducer');

// set up 3 bullets
const bullet = Map({
  id: 'number1',
  userId: 'user1',
  x: 0,
  y: 1.6,
  z: 5,
  xrot: 0,
  yrot: 0,
  zrot: 0
});

const bullet2 = Map({
  id: 'number2',
  userId: 'user2',
  x: 1,
  y: 1.6,
  z: 5,
  xrot: 0,
  yrot: 0,
  zrot: 0
});

const bullet3 = Map({
  id: 'number3',
  userId: 'user3',
  x: 2,
  y: 1.6,
  z: 5,
  xrot: 0,
  yrot: 0,
  zrot: 0
});

const updatedBullet1Data = Map({
  id: 'number1',
  userId: '1user',
  x: 1,
  y: 2.6,
  z: 6,
  xrot: 1,
  yrot: 1,
  zrot: 1
});

let emptyInitialState;
let populatedState;

// set up an empty initial state and a populated initial state
beforeEach(() => {
  emptyInitialState = Map({});

  populatedState = Map({
    'number1': bullet,
    'number2': bullet2
  });
});

describe('bulletReducer', () => {
  it('adds a bullet to an initial empty state of bullets', () => {
    const action = {
      type: ADD_BULLET,
      bullet: bullet
    };

    const nextState = bulletReducer(emptyInitialState, action);

    expect(nextState).to.equal(Map({
      'number1': Map({
        id: 'number1',
        userId: 'user1',
        x: 0,
        y: 1.6,
        z: 5,
        xrot: 0,
        yrot: 0,
        zrot: 0
      })
    }));
  });

  it('adds a bullet to a populated state of bullets', () => {
    const action = {
      type: ADD_BULLET,
      bullet: bullet3
    };

    const nextState = bulletReducer(populatedState, action);

    expect(nextState).to.equal(Map({
      'number1': bullet,
      'number2': bullet2,
      'number3': Map({
        id: 'number3',
        userId: 'user3',
        x: 2,
        y: 1.6,
        z: 5,
        xrot: 0,
        yrot: 0,
        zrot: 0
      })
    }));
  });

  it('removes a bullet from a populated state', () => {
    const action = {
      type: REMOVE_BULLET,
      bulletId: 'number1'
    };

    const nextState = bulletReducer(populatedState, action);

    expect(nextState).to.equal(Map({
      'number2': bullet2
    }));
  });

  it('returns initial empty state when action doesn\'t match', () => {
    const action = {
      type: 'SOMETHING_ELSE',
      bulletId: 'number1'
    };

    const nextState = bulletReducer(emptyInitialState, action);

    expect(nextState).to.equal(Map({}));
  });

  it('returns initial populated state when action doesn\'t match', () => {
    const action = {
      type: 'SOMETHING_ELSE',
      bulletId: 'number1'
    };

    const nextState = bulletReducer(populatedState, action);

    expect(nextState).to.equal(Map({
      'number1': bullet,
      'number2': bullet2
    }));
  });
});
