const router = require('express').Router();
const chalk = require('chalk');

router.route('/')
  .get((req, res, next) => {
    console.log(chalk.magenta('Someone is requesting session information.'));
    res.status(200).json({session: req.session});
  })
  .post((req, res, next) => {
    console.log(chalk.magenta('Save of user intialization beginning.'));
    req.session.socketData = req.body;
    res.status(200).json({Message: 'Success'});
  })
  .put((req, res, next) => {
    console.log(chalk.magenta('Storing Test Session Data...'));
    let welcomeText = req.body.welcomeText;

    req.session.welcomeText = welcomeText;

    res.status(200).json({Message: 'Success'});
  });

module.exports = router;
