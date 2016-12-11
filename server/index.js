'use strict';

const app = require('express')();
const _db = require('./db/db');

require('./configure')(app, _db);
require('./sessions')(app);

app.use('/api', require('./routes'));

app.get('/*', (req, res) => {
  console.log(req.session);
  res.sendFile(app.getValue('indexPath'));
});

app.use((err, req, res, next) => {
  console.error(err, typeof next);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

module.exports = app;
