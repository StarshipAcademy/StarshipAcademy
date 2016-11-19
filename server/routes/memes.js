const router = require('express').Router();
const Memes = require('../db/models/memes');
const chalk = require('chalk');

router.get('/', (req, res, next) => {
  console.log(chalk.green('You are looking for Memes eh?'));
  res.json({url: 'www.reddit.com'});
});

module.exports = router;
