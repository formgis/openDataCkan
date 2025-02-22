const { Sequelize } = require("sequelize");

const db = new Sequelize('db_ckan', 'root', 'Fcporto#2024', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = db;