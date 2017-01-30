'use strict';

import db from '../db';

// KF: Small thing but why is this called Type instead of Sequelize? Seems confusing.
// Are you guys going to add anything else to this model to facilitate actual user accounts/login functionality?
const Type = db.Sequelize;

export default db.define('user', {
  Name: {
    type: Type.STRING,
    allowNull: false
  }
});
