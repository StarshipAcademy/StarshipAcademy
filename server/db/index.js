'use strict';

const db = require('./db');
const chalk = require('chalk');
const Promise = require('bluebird');

require('./models');

const syncDB = Promise.promisify(() => {
  db.sync();
  console.log(chalk.green('Hey, Morty, I got the hardest working Memes in the universe - try not to ruin it, alright Morty? (Your Memes Have Been Synced)'));
});

module.exports = syncDB;
