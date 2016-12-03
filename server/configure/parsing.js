'use strict';

const BP = require('body-parser');
const CP = require('cookie-parser');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const secrets = require('../../secrets');
const passport = require('passport');

module.exports = (app, _db) => {
  app.use(BP.json());
  app.use(BP.urlencoded({extended: true}));

  app.use(CP(secrets.CookieKey));

  const sessionStore = new SequelizeStore({db: _db});
  sessionStore.sync();

  app.use(session({
    secret: secrets.SessionKey,
    store: sessionStore,
    resave: false,
    saveUninitialized: false
  }));

  app.use(passport.initialize());
  app.use(passport.session());
};
