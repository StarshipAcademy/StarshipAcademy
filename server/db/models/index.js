'use strict';

const Meme = require('./memes');
const Troll = require('./trolls');
const User = require('./users');

// Instantiate M-to-M relationship.
Troll.belongsToMany(Meme, {through: 'TrollMemes'});
Meme.belongsToMany(Troll, {through: 'TrollMemes'});

module.exports = {
  Troll: Troll,
  Meme: Meme,
  User: User
};
