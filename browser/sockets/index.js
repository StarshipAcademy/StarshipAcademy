import io from 'socket.io-client';
const socket = io.connect();


socket.on('eventName', () => {
  //do stuff
});

export default socket;
