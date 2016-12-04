'use strict';

const path = require('path');
const logMiddleware = require('volleyball');

const rootPath = path.join(__dirname, '../../');
const indexPath = path.join(rootPath, './browser/app.html');
const faviconPath = path.join(rootPath, './browser/favicon/favicon.ico');

module.exports = (app) => {
  app.setValue('projectRoot', rootPath);
  app.setValue('indexPath', indexPath);
  app.setValue('faviconPath', faviconPath);
  app.setValue('log', logMiddleware);
};
