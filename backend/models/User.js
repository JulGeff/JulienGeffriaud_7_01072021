
require('dotenv').config()            // importation dotenv pour sécuriser passwords
const mysqlTable = process.env.DB_TABLE;
const mysqlUsername = process.env.DB_USERNAME;     
const mysqlPassword = process.env.DB_PASSWORD;          
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(mysqlTable, mysqlUsername, mysqlPassword, {
  host : 'localhost',
  dialect: 'mysql'

})

const userSchema = sequelize.define('User', {
 
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },

  isAdmin: 
  {
    type: DataTypes.BOOLEAN,
    defaultValue: 0
  },
});


module.exports = sequelize.models.userSchema; // Export du schéma en tant que modèle sequelize pour le rendre disponible pour notre application Express.

