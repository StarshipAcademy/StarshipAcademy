'use strict';

const path = require('path');
const logMiddleware = require('volleyball');

const rootPath = path.join(__dirname, '../../');
const indexPath = path.join(rootPath, './public/index.html');

module.exports = (app) => {
  app.setValue('projectRoot', rootPath);
  app.setValue('indexPath', indexPath);
  app.setValue('log', logMiddleware);
};
