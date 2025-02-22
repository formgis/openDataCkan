const { Sequelize } = require("sequelize");
const db = require('../config/Database');
const { DataTypes } = require('sequelize');
const Users = require ('./User');
const Packages = require ('./Package');
 
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



module.exports = Histories;
