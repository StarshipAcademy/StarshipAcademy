'use strict';

import parseurl from 'parseurl';

/*
  Very basic use of session configuration that simply monitors your views to any URL.
*/
export default (app) => {
  app.use((req, res, next) => {
    let views = req.session.views;

    if (!views) views = req.session.views = {};

    const pathname = parseurl(req).pathname;
    views[pathname] = (views[pathname] || 0) + 1;

    next();
  });
};
