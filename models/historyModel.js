import { Sequelize } from "sequelize";
import db from '../config/Database.js';
import Users  from "./userModel.js";
import Packages from './packageModel.js';

import { DataTypes } from 'sequelize';

const Histories = db.define('history', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  action:{
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      notEmpty: true
    }
  },
  timestamp:{
    type: DataTypes.DATE,
    allowNull: false,
    validate:{
      notEmpty: true
    }
  },
  comment:{
    type: DataTypes.TEXT,
    allowNull: false,
    validate:{
      notEmpty: true
    }
  }
  }, {
  freezeTableName: true,
  timestamps: false
});

Users.hasOne(Histories, { foreignKey: 'user_id' });
Histories.belongsTo(Users, { foreignKey: 'user_id' });

Packages.hasOne(Histories, { foreignKey: 'package_id' });
Histories.belongsTo(Packages, { foreignKey: 'package_id' });


export default Histories;