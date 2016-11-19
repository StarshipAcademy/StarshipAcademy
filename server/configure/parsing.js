'use strict';

var BP = require('body-parser');

module.exports = (app) => {
  app.use(BP.json());
  app.use(BP.urlencoded({extended: true}));
};
