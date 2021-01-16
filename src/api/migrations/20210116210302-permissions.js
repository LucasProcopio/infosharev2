'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('Permissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      activityId: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
      },
      authorId: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
      },
      requestUserId: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
      },
      accepted: {
        allowNull: false,
        defautlValue: 0,
        type: Sequelize.DataTypes.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
    })
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('Permissions');
  }
};
