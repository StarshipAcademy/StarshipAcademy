'use strict';

const db = require('./db');
const chalk = require('chalk');

require('./models');

// The exported function that takes a param as to whether or not to sync the db.
const syncDB = (sync = false) => {
  return db.sync({force: sync})
    .then(() => {
      if (sync) console.log(chalk.cyan('Rick, that was brutal! (Force Sync Complete)'));
      else console.log(chalk.green('Hey, Morty, I got the hardest working Memes in the universe - try not to ruin it, alright Morty? (Your Memes Have Been Synced)'));
    })
    .catch((err) => console.error(err));
};

module.exports = syncDB;
