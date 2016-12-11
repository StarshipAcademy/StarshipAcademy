'use strict';

const db = require('../db');
const Type = db.Sequelize;

module.exports = db.define('user', {
  Name: {
    type: Type.STRING,
    allowNull: false
  }
});
