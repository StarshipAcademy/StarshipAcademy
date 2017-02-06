
// User constructor
function User(id) {
  this.id = id;
  this.x = 0;
  this.y = 0;
  this.z = 0;
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


function randomPos() {
  return Math.floor(Math.random() * (4801) - 2400);
}

// Asteroid constructor
function Asteroid(id) {
  this.id = id;
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
  const asteroid = new Asteroid(asteroidCounter++);
  return asteroid;
}


module.exports = {
  createUser,
  getOtherUsers,
  createAsteroid
};
