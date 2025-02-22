const { Sequelize } = require("sequelize");
const db = require('../config/Database');
const { DataTypes } = require('sequelize');

const Users = db.define('user', {
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
  },
  email:{
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      notEmpty: true
    }
  },
  created:{
    type: DataTypes.DATE,
    allowNull: false,
    validate:{
      notEmpty: true
    }
  },
  last_login:{
    type: DataTypes.DATE,
    allowNull: false,
    validate:{
      notEmpty: true
    },
  },
}, {
  freezeTableName: true,
  timestamps: false
});


module.exports = Users;