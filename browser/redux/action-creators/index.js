import {
  CHANGE_WELCOME
} from '../constants';
import axios from 'axios';

const createWelcomeText = (text) => ({ type: CHANGE_WELCOME, welcomeText: text });

// Used by the front end to live change the welcomeText.
export const changeWelcomeText = text => dispatch => {
  axios.put('/api/sessions', {welcomeText: text})
    .then(() => {
      dispatch(createWelcomeText(text));
    })
    .catch(() => {
      console.log('Changing Welcome Text Failed.');
    });
};

// This function is run by sockets after they've initialized a user.
export const fetchWelcomeText = () => dispatch => {
  // Fetch the recently reset session information.
  axios.get('/api/sessions')
    .then(res => {
      return res.data;
    })
    // Now reset the data.
    .then(({ session }) => {
      if (session.welcomeText) {
        dispatch(createWelcomeText(session.welcomeText));
      } else {
        console.log('No previous welcome text.');
      }
    })
    .catch(() => {
      console.log('Fetching Welcome Text Failed.');
    });
};
