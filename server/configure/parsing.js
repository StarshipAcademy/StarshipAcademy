'use strict';

import BP from 'body-parser';
import session from 'express-session';
import connectSession from 'connect-session-sequelize';
import secrets from '../../secrets';
import passport from 'passport';

const SequelizeStore = connectSession(session.Store);

export default (app, _db) => {
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
