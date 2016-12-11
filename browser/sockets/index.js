import io from 'socket.io-client/socket.io.js';
import axios from 'axios';
const socket = io.connect();

socket.on('KickTroll', () => {
  window.location = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
});

socket.on('InitUser', (currentSocket) => {
  axios.post('/api/sessions', currentSocket)
    .then(() => {})
    .catch(() => {
      console.log('Error initializing user. Kicking now.');
      window.location = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    });
});

export default socket;
