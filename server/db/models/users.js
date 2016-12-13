'use strict';

import db from '../db';
const Type = db.Sequelize;

export default db.define('user', {
  Name: {
    type: Type.STRING,
    allowNull: false
  }
});
