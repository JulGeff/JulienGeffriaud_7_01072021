'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      publicationId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Publications",
          key: "id",
          as: "publicationId"
        }
      },

      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
          as: "userId"
        }},

      comment: {
        allowNull: false,
        type: Sequelize.STRING,
        len: [2,200]
      },
      
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Comments');
  }
};