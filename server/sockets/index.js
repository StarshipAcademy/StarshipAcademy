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

  // KF: There's a lottttt of code in the callback below. I know quite a bit of it is console logs and 
  // comments, but you could still consider making it a bit more modular, e.g. functions to initializeSocket and disconnectSocket.
  // You could then do !currentSockets.some(e => e.address == ipAddress) ? initializeSocket(socket) : disconnectSocket(socket) to
  // make this look a lot nicer.

  IO.on('connection', (socket) => {
    totalConnections++;
    socket.name = 'memeLover' + totalConnections;
    // Snatch a users IP.
    let ipAddress = socket.request.connection.remoteAddress;

    // If no sockets have the same IP, begin initialization.
    if (!currentSockets.some(e => e.address == ipAddress)) {
      // Create the data we are interested in.
      let currentSocket = {
        id: socket.id,
        name: socket.name,
        time: new Date(),
        address: ipAddress
      };
      // Push it into an array of all active sockets.
      currentSockets.push(currentSocket);
      console.log(chalk.magenta(`${socket.name} wants games REAL-TIME.`));
      // Begin intialization of sessions.
      socket.emit('InitUser', currentSocket);
    } else {
      // If this IP already exists, then lets deal with it differently.
      console.log(chalk.red(`${socket.name} is already playing.`));
      console.log(chalk.red(`Rick, I don't like this guy.`));
      // Knock this socket out of our currently active sockets.
      refreshSockets(socket);
      // Emit an event that punishes said user.
      socket.emit('KickTroll');
      // Disconnect the socket.
      socket.disconnect();
    }

    socket.on('disconnect', () => {
      // If a user leaves, please alert us.
      console.log(chalk.magenta(`${socket.name} has had enough.`));
      // Then remove them from currently active users.
      refreshSockets(socket);
    });
  });
};
