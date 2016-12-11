const router = require('express').Router();
const chalk = require('chalk');

router.get('/', (req, res, next) => {
  console.log(chalk.red('Someone is requesting session information.'));
  res.json({session: req.session});
});

module.exports = router;
