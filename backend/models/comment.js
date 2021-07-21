'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      models.User.belongsToMany(models.Publication, {
        through: models.Comment,
        foreignKey: 'userId',
        otherKey: 'publicationId',
      });
  
      models.Publication.belongsToMany(models.User, {
        through: models.Comment,
        foreignKey: 'publicationId',
        otherKey: 'userId',
      });
  
      models.Comment.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
  
      models.Comment.belongsTo(models.Publication, {
        foreignKey: 'publicationId',
        as: 'publication',
      });
    }
  };

  Comment.init({
    publicationId: DataTypes.STRING,
    userId: DataTypes.STRING,
    comment: DataTypes.STRING
    
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};