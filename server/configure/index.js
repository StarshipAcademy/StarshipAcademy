'use strict';

module.exports = (app, _db) => {
  // Force the context of this.
  app.setValue = app.set.bind(app);
  // Make a function that gets the path to this app.
  app.getValue = (path) => app.get(path);

  // Use the two above functions to give myself properties.
  require('./app-variables')(app);
  // Give myself a logging ability.
  app.use(app.getValue('log'));

  // Configure my static routes and parsing abilities.
  require('./parsing')(app, _db);
  require('./static')(app);
};
