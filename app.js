'use strict';

import myServer from './server';

import HTTP from 'http';
import startDB from './server/db';
import chalk from 'chalk';

const server = HTTP.createServer();
const _Port = 3001;

import ioInit from './server/sockets';

import { getYesNo } from 'cli-interact';
const syncTruth = getYesNo(chalk.cyan('Rick, do you wanna get savage on this database? (Force Sync)'));

// The order of initializing the backend.
startDB(syncTruth)
  .then(() => server.on('request', myServer))
  .then(() => ioInit(server))
  .catch(err => console.error(err))
  .finally(() => server.listen(_Port, () => console.log(chalk.magenta(`Meme magic has begun on Port ${_Port}`))));
