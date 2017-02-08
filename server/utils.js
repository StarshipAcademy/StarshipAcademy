
function randomPos() {
  return Math.floor(Math.random() * (3000) - 1500);
}

// User constructor
function User(id) {
  this.id = id;
  this.x = randomPos();
  this.y = randomPos();
  this.z = randomPos();
  this.xrot = 0;
  this.yrot = 0;
  this.zrot = 0;
}

// Create a user given the socket ID
function createUser(id) {
  const user = new User(id);
  return user;
}

// When a user connects, send them a list of all of the existing users (minus themselves)
function getOtherUsers(users, id) {
  return users.filterNot(userData => userData.get('id') === id);
}

function randomType() {
  const types = ['asteroid1', 'asteroid2', 'octa'];
  return types[Math.floor(Math.random() * (3))];
}

// Asteroid constructor
function Asteroid(id) {
  this.id = id;
  this.type = randomType();
  this.x = randomPos();
  this.y = randomPos();
  this.z = randomPos();
// this.xrot = 0;
// this.yrot = 0;
// this.zrot = 0;
}

let asteroidCounter = 0;
// Create an Asteroid
function createAsteroid() {
  // console.log('############## in create function')
  const asteroid = new Asteroid(asteroidCounter++);
  console.log
  return asteroid;
}

module.exports = {
  createUser,
  getOtherUsers,
  createAsteroid
};
