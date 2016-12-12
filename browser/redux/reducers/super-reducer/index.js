// This design pattern helps avoid the nesting problem that combineReducers creates.
export default (state, reducers, action) => {
  let reducedState = Object.assign({}, state);
  reducers.forEach(reducer => {
    reducedState = reducer(reducedState, action);
  });
  return reducedState;
};
