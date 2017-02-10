'use strict';

import BP from 'body-parser';

export default (app) => {
  // Enable body parser.
  app.use(BP.json());
  app.use(BP.urlencoded({
    extended: true
  }));
};
