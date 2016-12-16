import { SET_INITIALIZED } from '../../constants';
import initialState from '../../initialState';

export default (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case SET_INITIALIZED:
      console.log('Hit type route!');
      return state.merge({ isInitialized: true });
    default:
      console.log('Hit default!');
      return state;
  }
};
