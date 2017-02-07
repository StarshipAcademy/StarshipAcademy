'use strict';

import path from 'path';
import logMiddleware from 'volleyball';

const rootPath = path.join(__dirname, '../../');
const menuPath = path.join(rootPath, './browser/menu.html');
const faviconPath = path.join(rootPath, './browser/favicon/favicon.ico');

// Configure my built in properties.
export default (app) => {
  app.setValue('projectRoot', rootPath);
  app.setValue('menuPath', menuPath);
  app.setValue('faviconPath', faviconPath);
  app.setValue('log', logMiddleware);
};
