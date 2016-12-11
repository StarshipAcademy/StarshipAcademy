const router = require('express').Router();
const chalk = require('chalk');

router.route('/')
  .get((req, res, next) => {
    console.log(chalk.magenta('Someone is requesting session information.'));
    res.json({session: req.session});
  })
  .post((req, res, next) => {
    console.log(chalk.magenta('Save of user intialization beginning.'));
    const transmissionData = Object.assign({}, req.session, {
      socketData: req.body
    });
    console.log(transmissionData);
    res.json({Message: 'Success'});
  });

module.exports = router;
