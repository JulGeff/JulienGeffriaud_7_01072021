//CONNEXION A LA BASE DE DONNEES MYSQL VIA SEQUELIZE
require('dotenv').config();       
const Sequelize = require('sequelize');
sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD,  {

      host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    timezone: '+02:00', 
  
 
  });

module.exports = sequelize;

