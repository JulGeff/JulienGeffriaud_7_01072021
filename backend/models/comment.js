'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {

     models.Comment.belongsTo(models.User, {
        foreignKey: 'userId',
       
      });
      models.Comment.belongsTo(models.Publication, {
        foreignKey: 'publicationId',

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