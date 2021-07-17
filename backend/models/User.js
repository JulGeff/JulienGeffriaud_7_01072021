'use strict'
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      models.User.hasMany(models.Post,
        { onDelete: 'cascade' });
    }
  };
  
  User.init({
    email : DataTypes.STRING,     
    firstName: DataTypes.STRING,     
    LastName: DataTypes.STRING,     
    password: DataTypes.STRING,     
    isAdmin: DataTypes.BOOLEAN, 

   }, 
  {
    sequelize,
    modelName: 'User',
  });
  return User;
};
