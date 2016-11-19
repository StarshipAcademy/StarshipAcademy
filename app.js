'use strict';

const server = require('http').createServer();
const startDB = require('./server/db');
const chalk = require('chalk');
const _Port = 3001;
const Promise = require('bluebird');

startDB();
server.on('request', require('./server'));
server.listen(_Port, () => console.log(chalk.magenta(`Meme magic has begun on Port ${_Port}`)));
