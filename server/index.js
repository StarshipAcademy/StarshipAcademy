'use strict';

const app = require('express')();
const _db = require('./db/db');
const chalk = require('chalk');

require('./configure')(app, _db);
require('./sessions')(app);

app.use('/api', require('./routes'));

app.get('/*', (req, res) => {
  if (req.session.socketData) {
    console.log(chalk.magenta(`A user @ ${req.session.socketData.address} just visited the site.`));
  }
  res.sendFile(app.getValue('indexPath'));
});

app.use((err, req, res, next) => {
  console.error(err, typeof next);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

module.exports = app;
