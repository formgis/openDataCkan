const { Sequelize } = require('sequelize');
const db = require('../config/Database');
const Package = require('./Package');
const Tag = require('./Tag');

const { DataTypes } = require('sequelize');

const PackageTag = db.define(
  'PackageTag',
  {},
  {
    timestamps: false,
  }
);

module.exports = PackageTag;
