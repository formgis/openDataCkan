const { Sequelize } = require("sequelize");
const db = require('../config/Database.js');
const { DataTypes } = require('sequelize');


const Organizations = db.define('organization', {
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
  title:{
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      notEmpty: true
    }
  },
  description:{
    type: DataTypes.TEXT,
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
  modified:{
    type: DataTypes.DATE,
    allowNull: false,
    validate:{
      notEmpty: true
    }
  }
}, {
  freezeTableName: true,
  timestamps: false,
});


module.exports = Organizations