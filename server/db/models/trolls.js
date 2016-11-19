'use strict';

const db = require('../db');
const Type = db.Sequelize;

module.exports = db.define('troll', {
  Title: {
    type: Type.STRING,
    allowNull: false
  },
  imageURL: {
    type: Type.STRING,
    allowNull: false
  }
});
