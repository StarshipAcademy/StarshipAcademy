import {
  CHANGE_WELCOME
} from '../constants';
import axios from 'axios';

const createWelcomeText = (text) => ({ type: CHANGE_WELCOME, welcomeText: text });

export const changeWelcomeText = text => dispatch => {
  axios.put('/api/sessions', {welcomeText: text})
    .then(() => {
      dispatch(createWelcomeText(text));
    })
    .catch(() => {
      console.log('Changing Welcome Text Failed.');
    });
};

export const fetchWelcomeText = () => dispatch => {
  axios.get('/api/sessions')
    .then(res => res.data)
    .then(({ session }) => {
      if (session.welcomeText) {
        dispatch(createWelcomeText(session.welcomeText));
      } else {
        console.log('No previous welcome text.');
      }
    })
    .catch(() => {
      console.log('Fetching Welcome Text Failed.');
    })
}
