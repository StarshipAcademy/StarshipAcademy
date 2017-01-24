import express from 'express';
const router = express.Router();
import chalk from 'chalk';

router.route('/')
  .get((req, res, next) => {
    res.status(200).json({session: req.session});
  })
  .put((req, res, next) => {
    // Pretty straightforward route for the front end to update welcomeText.
    console.log(chalk.magenta('Storing Test Session Data...'));
    let welcomeText = req.body.welcomeText;

    req.session.welcomeText = welcomeText;

    res.status(200).json({Message: 'Success'});
  });

export default router;
