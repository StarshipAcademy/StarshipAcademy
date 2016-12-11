'use strict';

const router = require('express').Router();

router.use('/memes', require('./memes'));
router.use('/trolls', require('./trolls'));
router.use('/sessions', require('./sessions'));

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
