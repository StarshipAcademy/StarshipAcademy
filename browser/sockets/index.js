import io from 'socket.io-client/socket.io.js';
const socket = io.connect();

socket.on('KickTroll', () => {
  window.location = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
});

export default socket;
