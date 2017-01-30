import socketio from 'socket.io';
import chalk from 'chalk';

let currentSockets = [];
let totalConnections = 0;

let IO = null;

// Essentially filters through all of the sockets and ensures that we have no duplicate sockets.
const refreshSockets = (socket) => {
  currentSockets = currentSockets.filter(e => e.id !== socket.id);
};

export default (server) => {
  if (server == undefined) return IO;
  if (IO) return IO;

  IO = socketio(server);

  require('./socket.js')(IO);
};
