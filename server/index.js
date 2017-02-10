'use strict';

import express from 'express';

const app = express();
import chalk from 'chalk';

import configServer from './configure';

configServer(app);

app.get('/*', (req, res) => {
  res.sendFile(app.getValue('menuPath'));
});

app.use((err, req, res, next) => {
  console.error(err, typeof next);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

export default app;
