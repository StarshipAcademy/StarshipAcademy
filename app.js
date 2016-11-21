'use strict';

const server = require('http').createServer();
const startDB = require('./server/db');
const chalk = require('chalk');
const _Port = 3001;
const Promise = require('bluebird');
let io = null;

// Need to promisify somehow for better practice.
startDB();
server.on('request', require('./server'));
io = require('./server/sockets')(server);

server.listen(_Port, () => console.log(chalk.magenta(`Meme magic has begun on Port ${_Port}`)));
