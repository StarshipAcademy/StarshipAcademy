import initialState from '../initialState';
import superReducer from './super-reducer';
import allReducers from './allReducers.js';

// My custom combine reducers in action.
export default (state = initialState, action) => {
  return superReducer(state, allReducers, action);
};
