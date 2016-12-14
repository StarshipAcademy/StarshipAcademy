import express from 'express';
const router = express.Router();

import Trolls from '../db/models/trolls';
import Memes from '../db/models/memes';
import chalk from 'chalk';

router.get('/', (req, res, next) => {
  console.log(chalk.green('You are looking for Trolls eh?'));
  res.json({aTroll: 'Joe Biden'});
});

export default router;
