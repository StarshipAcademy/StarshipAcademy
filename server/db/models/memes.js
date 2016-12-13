'use strict';

import db from '../db';
const Type = db.Sequelize;

export default db.define('meme', {
  Title: {
    type: Type.STRING,
    allowNull: false
  },
  imageURL: {
    type: Type.STRING,
    allowNull: false
  }
});
