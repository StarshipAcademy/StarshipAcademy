'use strict';

const BP = require('body-parser');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const secrets = require('../../secrets');
const passport = require('passport');

module.exports = (app, _db) => {
  // Enable body parser.
  app.use(BP.json());
  app.use(BP.urlencoded({extended: true}));

  // Create and sync my Session Storage.
  // TO-DO - Look into doing this without a library.
  const sessionStore = new SequelizeStore({db: _db});
  sessionStore.sync();

  // Instantiate the use of the session store.
  app.use(session({
    secret: secrets.SessionKey,
    store: sessionStore,
    resave: false,
    saveUninitialized: true
  }));

  // Enable passport.
  app.use(passport.initialize());
  app.use(passport.session());
};
