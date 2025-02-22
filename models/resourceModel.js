import { Sequelize } from "sequelize";
import db from '../config/Database.js';
import Packages from './packageModel.js';
import Users from './userModel.js';

import { DataTypes } from 'sequelize';

const Resources = db.define('resource', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name:{
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      notEmpty: true,
      len: [3, 100] 
    }
  },
  format:{
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      notEmpty: true
    }
  },
  url:{
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      notEmpty: true
    }
  },
  size:{
    type: DataTypes.INTEGER,
    allowNull: false,
    validate:{
      notEmpty: true
    }
  }
}, {
  freezeTableName: true,
  timestamps: false
});

Packages.hasMany(Resources, { foreignKey: 'package_id' });
Resources.belongsTo(Packages, { foreignKey: 'package_id' });

Users.hasOne(Resources, { foreignKey: 'user_id' });
Resources.belongsTo(Users, { foreignKey: 'user_id' });

export default Resources;