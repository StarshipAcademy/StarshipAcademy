'use strict';

import myServer from './server';

import HTTP from 'http';
import startDB from './server/db';
import chalk from 'chalk';

const server = HTTP.createServer();
const _Port = process.env.PORT || 9001;

import ioInit from './server/sockets';

// import { getYesNo } from 'cli-interact';
// const syncTruth = getYesNo(chalk.cyan('Do you wanna get savage on this database? (Force Sync)'));

// The order of initializing the backend.
startDB(false) //change back to syncTruth to use db
  .then(() => server.on('request', myServer))
  .then(() => ioInit(server))
  .catch(err => console.error(err))
  .finally(() => server.listen(_Port, () => console.log(chalk.magenta(`Starship Academy has begun on Port ${_Port}`))));
