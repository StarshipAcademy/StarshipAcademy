import { Map } from 'immutable';

const immutArray = [];

// This design pattern helps avoid the nesting problem that combineReducers creates.
export default (state, reducers, action) => {
  if(immutArray.length === 0) immutArray.push(state);

  reducers.forEach(reducer => {
    immutArray.push(Map(reducer(immutArray[immutArray.length - 1], action)));
  });

  return immutArray[immutArray.length - 1];
};
