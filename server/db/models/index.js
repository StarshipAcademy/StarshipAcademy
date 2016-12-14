'use strict';

import Meme from './memes';
import Troll from './trolls';
import User from './users';

// Instantiate M-to-M relationship.
Troll.belongsToMany(Meme, {through: 'TrollMemes'});
Meme.belongsToMany(Troll, {through: 'TrollMemes'});

export default {
  Meme: Meme,
  Troll: Troll,
  User: User
};
