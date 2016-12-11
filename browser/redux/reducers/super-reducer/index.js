export default (state, reducers, action) => {
  let reducedState = Object.assign({}, state);
  console.log(reducedState);
  reducers.forEach(reducer => {
    reducedState = reducer(reducedState, action);
  });
  console.log(reducedState);
  return reducedState;
};
