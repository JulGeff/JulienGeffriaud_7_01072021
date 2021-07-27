const Sequelize = require('sequelize');
const sequelize = require('../database');

const Publication = sequelize.define('publication', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      title: Sequelize.STRING,
      content: Sequelize.STRING
    });
    
    module.exports = Publication;