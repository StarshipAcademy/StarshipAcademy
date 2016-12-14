import express from 'express';
const router = express.Router();

import Memes from '../db/models/memes';
import chalk from 'chalk';

router.get('/', (req, res, next) => {
  console.log(chalk.green('You are looking for Memes eh?'));
  res.json({url: 'www.reddit.com'});
});

export default router;
