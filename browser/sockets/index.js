import io from 'socket.io-client';
window.socket = io.connect();

import { putSelfOnDOM, putUserOnDOM, updateUser, removeUser, putAsteroidOnDOM, removeAsteroid } from '../utils';
import '../src/components/publish';

// This is the person who connected
socket.on('connect', () => {
  console.log('You\'re connected to the server')
});

socket.on('createUser', user => {
  console.log('adding yourself to the DOM')
  const avatar = putSelfOnDOM(user);
  socket.emit('getOthers');
});

// When someone connects initially, this will get any other users already there
socket.on('getOthersCallback', users => {
  console.log('Checking to see if anyone is here');
  // For each existing user that the backend sends us, put on the DOM
  Object.keys(users).forEach(user => {
    putUserOnDOM(users[user])
  });
  // This goes to the server, and then goes to `publish` to tell the `tick` to start
  socket.emit('haveGottenOthers');
});

socket.on('getAsteroidsCallback', asteroids => {
  console.log('########### getting asteroids')
  Object.keys(asteroids).forEach(asteroid => {
    putAsteroidOnDOM(asteroids[asteroid])
  });
  console.log('########### put asteroids on DOM')
  socket.emit('haveGottenAsteroids');
  socket.emit('readyToReceiveUpdates');
});

// Using a filtered users array, this updates the position & rotation of every other user
// If a user's avatar is already on the DOM, update it
// If a user's avatar is NOT on the DOM already, add it
socket.on('usersUpdated', users => {
  Object.keys(users).forEach(key => {
    let user = users[key];
    const otherAvatar = document.getElementById(user.id);
    (otherAvatar) ? updateUser(user) : putUserOnDOM(user);
  });
});

socket.on('bulletsUpdated', users => {
  Object.keys(users).forEach(key => {
    let user = users[key];
    const otherAvatar = document.getElementById(user.id);
    if (otherAvatar) updateUsersBullets(user);
  });
});

socket.on('AddAsteroid', asteroid => {
  console.log('########### add an asteroid', asteroid)
  putAsteroidOnDOM(asteroid)
}); //gets an asteroid obj
socket.on('removeAsteroid', removeAsteroid); //gets an id

// Remove a user's avatar when they disconnect from the server
socket.on('removeUser', removeUser);

export default socket;
