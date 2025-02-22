const { Sequelize } = require("sequelize");
const db = require('../config/Database');
const Packages = require('./Package');
const { DataTypes } = require('sequelize');

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


module.exports = Tags;
