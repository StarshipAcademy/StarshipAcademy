'use strict';

import path from 'path';
import logMiddleware from 'volleyball';

const rootPath = path.join(__dirname, '../../');
const indexPath = path.join(rootPath, './browser/app.html');
const faviconPath = path.join(rootPath, './browser/favicon/favicon.ico');

// Configure my built in properties.
export default (app) => {
  app.setValue('projectRoot', rootPath);
  app.setValue('indexPath', indexPath);
  app.setValue('faviconPath', faviconPath);
  app.setValue('log', logMiddleware);
};
