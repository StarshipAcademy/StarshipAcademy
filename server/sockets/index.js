const socketio = require('socket.io');
const chalk = require('chalk');
let currentSockets = [];
let totalConnections = 0;

let io = null;

const refreshSockets = (socket) => {
  currentSockets = currentSockets.filter(e => e.id !== socket.id);
};

module.exports = (server) => {
  if (io) return io;

  io = socketio(server);

  io.on('connection', (socket) => {
    totalConnections++;
    socket.name = 'memeLover' + totalConnections;
    let ipAddress = socket.request.connection.remoteAddress;

    if (!currentSockets.some(e => e.address == ipAddress)) {
      currentSockets.push({
        id: socket.id,
        name: socket.name,
        time: new Date(),
        address: ipAddress
      });
      console.log(chalk.magenta(`${socket.name} wants Memes REAL-TIME.`));

    } else {
      console.log(chalk.red(`${socket.name} is already being delivered Memes.`));
      console.log(chalk.red(`Rick, I don't like this guy.`));
      refreshSockets(socket);
      socket.emit('KickTroll');
      socket.disconnect();
    }

    socket.on('disconnect', () => {
      console.log(chalk.magenta(`${socket.name} has had enough memes.`));
      refreshSockets(socket);
    });
  });

  return io;
};
