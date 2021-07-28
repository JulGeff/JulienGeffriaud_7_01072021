const Sequelize = require('sequelize');
const sequelize = require('../database');

const Publication = sequelize.define('publication', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },

      title: {
        allowNull: false,
        type: Sequelize.STRING,
        len: [2,50]
      },
      
      content: {
        allowNull: false,
        type: Sequelize.STRING(1234),
        len: [2,1000]
      }
    });
    
    module.exports = Publication;