import initialState from '../initialState';
import superReducer from './super-reducer';
import allReducers from './allReducers.js';

export default (state = initialState, action) => {
  return superReducer(state, allReducers, action);
};
