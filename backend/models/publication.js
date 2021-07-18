'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Publication extends Model {
    static associate(models) {
      models.Publication.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    }
  };
  
  Publication.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Publication',
  });
  return Publication;
};