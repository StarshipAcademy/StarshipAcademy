'use strict';

const path = require('path');
const chalk = require('chalk');
const Sequelize = require('sequelize');
const memeDB = 'meme-magic';

console.log(chalk.yellow('Rick, I need more Memes!'));

module.exports = new Sequelize(memeDB, null, null, {host: 'localhost', logging: false, dialect: 'postgres', native: true});
