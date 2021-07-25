'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
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