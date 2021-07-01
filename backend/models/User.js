
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(mysql, { // Connexion à la base de données mySQL
  dialect: 'mysql',
  dialectOptions: {
    // Your mysql2 options here
  }
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

