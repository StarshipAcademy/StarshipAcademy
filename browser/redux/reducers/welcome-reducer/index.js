import { CHANGE_WELCOME } from '../../constants';
import initialState from '../../initialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_WELCOME:
      return state.merge({ welcomeText: action.welcomeText });
    default:
      return state;
  }
};
