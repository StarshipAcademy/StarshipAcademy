import {
  CHANGE_WELCOME
} from '../constants';

const createWelcomeText = (text) => ({ type: CHANGE_WELCOME, welcomeText: text });

export const changeWelcomeText = (text) => dispatch => {
  dispatch(createWelcomeText(text));
};
