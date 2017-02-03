import path from 'path';
import express from 'express';
import favicon from 'serve-favicon';

// Serve up my chosen static files as well as my favicon.
export default (app) => {
  const root = app.getValue('projectRoot');

  const npmPath = path.join(root, './node_modules');
  const browserPath = path.join(root, './browser');
  const publicPath = path.join(root, './public');

  app.use(express.static(npmPath));
  app.use(express.static(browserPath));
  app.use(express.static(publicPath));
  app.use(favicon(app.getValue('faviconPath')));
};
