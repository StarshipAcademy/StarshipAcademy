import { SET_INITIALIZED } from '../../constants';
import initialState from '../../initialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIALIZED:
      return state.merge({ isInitialized: true });
    default:
      return state;
  }
};
