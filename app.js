'use strict';
require('babel-register');
import myServer from './server';

import HTTP from 'http';
import chalk from 'chalk';

const server = HTTP.createServer();
const _Port = process.env.PORT || 9001;

import ioInit from './server/sockets';

//initialize the backend.
server.on('request', myServer)
ioInit(server)
server.listen(_Port, () => console.log(chalk.magenta(`Starship Academy has begun on Port ${_Port}`)));
