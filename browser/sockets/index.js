import io from 'socket.io-client';
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
socket.on('InitUser', () => {
  fetchText();
});

export default socket;
