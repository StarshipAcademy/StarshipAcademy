'use strict';

const Meme = require('./memes');
const Troll = require('./trolls');

Troll.belongsToMany(Meme, {through: 'TrollMemes'});
Meme.belongsToMany(Troll, {through: 'TrollMemes'});

module.exports = {
  Troll: Troll,
  Meme: Meme
};
