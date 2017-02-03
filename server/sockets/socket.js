const chalk = require('chalk');
const {Map, List} = require('immutable');

const store = require('../redux/store');
const {createAndEmitUser, updateUserData, removeUserAndEmit} = require('../redux/reducers/user-reducer');
const {getOtherUsers} = require('../utils');

module.exports = io => {
  io.on('connection', socket => {
    console.log(chalk.yellow(`${socket.id} has connected`));

    // New user enters; create new user and new user appears for everyone else
    store.dispatch(createAndEmitUser(socket));

    // This will send all of the current users to the user that just connected
    socket.on('getOthers', () => {
      let allUsers = store.getState().users.toArray();
      let allUsersObj = {};
      allUsers.forEach(user => {
        console.log('CCCCCCCCCCC', user)
        allUsersObj[user.get('id')] = user.set('bullets', new List())
      })

      console.log('AAAAAAAAAAAAAAA', allUsersObj)

      let allBullets = store.getState().bullets;
      allBullets.forEach(bullet => {
        let user = allUsersObj[bullet.get(userId)];
        user.set('bullets', user.get('bullets').push(bullet))
      })
      console.log('BBBBBBBBBBBBBB', allBullets)

      allUsers = Map(allUsersObj)
      socket.emit('getOthersCallback', getOtherUsers(allUsers, socket.id));
    });

    // This is a check to ensure that all of the existing users exist on the DOM
    // before pushing updates to the backend
    socket.on('haveGottenOthers', () => {
      socket.emit('startTick');
    });

    // readyToReceiveUpdates is a check to make sure existing users have loaded
    // for the new user
    // Once they have, then the backend starts pushing updates to the frontend
    socket.on('readyToReceiveUpdates', () => {
      store.subscribe(() => {
        const allUsers = store.getState().users;
        socket.emit('usersUpdated', getOtherUsers(allUsers, socket.id));
      });
    });

    // This will update a user's position when they move, and send it to everyone
    // except the specific scene's user
    socket.on('tick', userData => {
      userData = Map(userData);
      store.dispatch(updateUserData(userData));
    });

    socket.on('disconnect', () => {
      store.dispatch(removeUserAndEmit(socket));
      console.log(chalk.magenta(`${socket.id} has disconnected`));
    });
  })
};
