'use strict';

import setVariables from './app-variables';
import setParsing from './parsing';
import setStatic from './static';

export default (app) => {
  // Force the context of this.
  app.setValue = app.set.bind(app);
  // Make a function that gets the path to this app.
  app.getValue = path => app.get(path);

  // Use the two above functions to give myself properties.
  setVariables(app);
  // Give myself a logging ability.
  app.use(app.getValue('log'));

  // Configure my static routes and parsing abilities.
  setParsing(app);
  setStatic(app);
};
