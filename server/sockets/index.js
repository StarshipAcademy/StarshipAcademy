const socketio = require('socket.io');
const chalk = require('chalk');
let currentSockets = [];
let totalConnections = 0;

let io = null;

module.exports = function (server) {
  if (io) return io;

  io = socketio(server);

  io.on('connection', (socket) => {
    totalConnections++;
    socket.name = 'memeLover' + totalConnections;
    currentSockets.push({
      id: socket.id,
      name: socket.name,
      time: new Date()
    });

    console.log(chalk.magenta(`${socket.name} wants Memes REAL-TIME.`));

    socket.on('disconnect', () => {
      console.log(chalk.magenta(`${socket.name} has had enough memes.`));
      currentSockets = currentSockets.filter(e => e.id !== socket.id);
    });
  });

  return io;
};
