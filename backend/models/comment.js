const Sequelize = require('sequelize');
const sequelize = require('../database');

const Comment = sequelize.define('comment', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      
      comment: {
        allowNull: false,
        type: Sequelize.STRING,
        len: [2,200]
      }
    
    });
    
    module.exports = Comment;