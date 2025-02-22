import { Sequelize } from "sequelize";
import db from '../config/Database.js';
import Packages from './packageModel.js';

import { DataTypes } from 'sequelize';

const Tags = db.define('tag', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name:{
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      notEmpty: true
    }
  }
}, {
  freezeTableName: true,
  timestamps: false
});

Packages.hasMany(Tags, { foreignKey: 'pakage_id' });
Tags.belongsTo(Packages, { foreignKey: 'pakage_id' });

export default Tags;