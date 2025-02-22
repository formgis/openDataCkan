import db from '../config/Database.js';
import { DataTypes } from 'sequelize';

const Groups = db.define('group', {
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
    },
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

export default Groups;