'use strict';

import path from 'path';
import chalk from 'chalk';
import Sequelize from 'sequelize';

const memeDB = 'meme-magic';
const url = process.env.DATABASE_URL || `postgres://localhost:5432/meme-magic`

console.log(chalk.yellow('Hey Rick!'));

const db = module.exports = new Sequelize(url, {
  native: true, // lets Sequelize know we can use pg-native for ~30% more speed
  define: {
    underscored: true, // use snake_case rather than camelCase column names
    freezeTableName: true, // don't change table names from the one specified
    timestamps: true, // automatically include timestamp columns
  }
})

export default db;
