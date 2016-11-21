const router = require('express').Router();
const Trolls = require('../db/models/trolls');
const Memes = require('../db/models/memes');
const chalk = require('chalk');

router.get('/', (req, res, next) => {
  console.log(chalk.green('You are looking for Trolls eh?'));
  res.json({aTroll: 'Joe Biden'});
});

module.exports = router;
