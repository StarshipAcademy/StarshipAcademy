import io from 'socket.io-client';
import axios from 'axios';
import { fetchWelcomeText } from '../redux/action-creators';
import store from '../redux/store';
const socket = io.connect();

const fetchText = () => {
  store.dispatch(fetchWelcomeText());
};

// Redirect a user.
socket.on('KickTroll', () => {
  window.location = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
});

// After we have initialized a user, lets get their information again.
socket.on('InitUser', (currentSocket) => {
  axios.post('/api/sessions', currentSocket)
    .then(() => {
      fetchText();
    })
    .catch(() => {
      console.log('Error initializing user. Kicking now.');
      window.location = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    });
});

export default socket;
