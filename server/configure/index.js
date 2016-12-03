'use strict';

module.exports = (app, _db) => {
  app.setValue = app.set.bind(app);
  app.getValue = (path) => app.get(path);

  require('./app-variables')(app);
  app.use(app.getValue('log'));

  require('./static')(app);
  require('./parsing')(app, _db);
};
