const path = require('path');
const express = require('express');

module.exports = (app) => {
  const root = app.getValue('projectRoot');

  const npmPath = path.join(root, './node_modules');
  const browserPath = path.join(root, './public');

  app.use(express.static(npmPath));
  app.use(express.static(browserPath));
};
