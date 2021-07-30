//CONNEXION A LA BASE DE DONNEES MYSQL VIA SEQUELIZE
require('dotenv').config();       
const Sequelize = require('sequelize');
sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD,  {

      host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      typeCast: function (field, next) { // for reading from database
        if (field.type === 'DATETIME') {
          return field.string()
        }
          return next()
        },
  },
    timezone: '+02:00', // for writing to databas
  
 
  });

module.exports = sequelize;

