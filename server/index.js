'use strict';

import express from 'express';

const app = express();
import _db from './db/db';
import chalk from 'chalk';

import configServer from './configure';
import configSessions from './sessions';

configServer(app, _db);
configSessions(app);

import Routes from './routes';

app.use('/api', Routes);

app.get('/*', (req, res) => {
  // if (req.session.socketData) {
  //   console.log(chalk.magenta(`A user @ ${req.session.socketData.address} just visited the site.`));
  // }
  res.sendFile(app.getValue('indexPath'));
});

app.use((err, req, res, next) => {
  console.error(err, typeof next);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

export default app;
