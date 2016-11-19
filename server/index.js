'use strict';

const path = require('path');
let app = require('express')();

require('./configure')(app);

app.use('/api', require('./routes'));

app.get('/*', (req, res) => {
  res.sendFile(app.getValue('indexPath'));
});

app.use((err, req, res, next) => {
  console.error(err, typeof next);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

module.exports = app;
