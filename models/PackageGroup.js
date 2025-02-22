const { Sequelize } = require('sequelize');
const db = require('../config/Database');
const Package = require('./Package');
const Group = require('./Group');

const { DataTypes } = require('sequelize');

const PackageGroup = db.define(
  'PackageGroup',
  {},
  {
    timestamps: false,
  }
);

module.exports = PackageGroup;
