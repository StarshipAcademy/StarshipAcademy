const chalk = require('chalk');
const {Map, List} = require('immutable');

const store = require('../redux/store');
const {createAndEmitUser, updateUserData, removeUserAndEmit} = require('../redux/reducers/user-reducer');
const {seedAsteroids, removeAsteroid, addAsteroid} = require('../redux/reducers/asteroid-reducer');
const {getOtherUsers, createAsteroid} = require('../utils');

console.log('############## about to seed')
store.dispatch(seedAsteroids());
console.log('############## seeded')

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
        allUsersObj[user.get('id')] = user.set('bullets', new List())
      })

      let allBullets = store.getState().bullets;
      allBullets.forEach(bullet => {
        let user = allUsersObj[bullet.get(userId)];
        user.set('bullets', user.get('bullets').push(bullet))
      })

      allUsers = Map(allUsersObj)
      socket.emit('getOthersCallback', getOtherUsers(allUsers, socket.id));
    });

    // This is a check to ensure that all of the existing users exist on the DOM
    // before pushing updates to the backend
    socket.on('haveGottenOthers', () => {
      console.log('########## got others, getting asteroids')
      let allAsteroids = store.getState().asteroids;
      socket.emit('getAsteroidsCallback', allAsteroids);
    });

    // This is a check to ensure that all of the existing users exist on the DOM
    // before pushing updates to the backend
    socket.on('haveGottenAsteroids', () => {
      console.log('########### got asteroids, starting tick');
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

    socket.on('removeAsteroid', id => {
      console.log('####### removing asteroid', id)
      store.dispatch(removeAsteroid(id));
      socket.broadcast.emit('removeAsteroid', id);

      let newAsteroid = createAsteroid()
      console.log('####### creating asteroid', newAsteroid)
      store.dispatch(addAsteroid(newAsteroid));
      io.sockets.emit('addAsteroid', newAsteroid);
    })

    socket.on('disconnect', () => {
      store.dispatch(removeUserAndEmit(socket));
      console.log(chalk.magenta(`${socket.id} has disconnected`));
    });
  })
};
