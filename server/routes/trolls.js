const router = require('express').Router();
const Memes = require('../db/models/trolls');
const chalk = require('chalk');

router.get('/', (req, res, next) => {
  console.log(chalk.green('You are looking for Trolls eh?'));
  res.json({url: 'www.reddit.com'});
});

module.exports = router;
