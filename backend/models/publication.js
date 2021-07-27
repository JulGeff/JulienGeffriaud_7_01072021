'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Publication extends Model {
    static associate(models) {
      models.Publication.belongsTo(models.User, 
        { foreignKey: 'userId',
        onDelete: 'CASCADE', });

      models.Publication.hasMany(models.Comment, {
          foreignKey: 'publicationId',
       
        });   
    }

    
  };
  
  Publication.init({
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Publication',
  });
  return Publication;
};