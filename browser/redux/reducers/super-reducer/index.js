export default (state, reducers, action) => {
  let reducedState = Object.assign({}, state);

  reducers.forEach(reducer => {
    reducedState = reducer(reducedState, action);
  });

  return reducedState;
};
