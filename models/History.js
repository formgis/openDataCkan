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



module.exports = Histories;
