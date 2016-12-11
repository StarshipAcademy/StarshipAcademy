import { CHANGE_WELCOME } from '../../constants';
import initialState from '../../initialState';

export default (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case CHANGE_WELCOME:
      return {
        ...state,
        welcomeText: action.welcomeText
      };
    default:
      return state;
  }
};
