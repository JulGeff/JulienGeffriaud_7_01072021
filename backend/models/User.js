const Sequelize = require('sequelize');
const sequelize = require('../database');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },

  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    len: [2,40]

  },
 
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    len: [2,40]

  },

  email: {
    type: Sequelize.STRING,
    allowNull: false,
    isEmail: true,
    unique: true,
    len: [2,40]

  },

  password: {
    type: Sequelize.STRING,
    allowNull: false
  },

  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: 0
  },
});

module.exports = User;