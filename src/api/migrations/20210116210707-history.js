'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('History', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      authorId: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      body: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      isPublic: {
        allowNull: false,
        defaultValue: 1,
        type: Sequelize.DataTypes.BOOLEAN
      },
      isExpired: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.DataTypes.BOOLEAN
      },
      userList: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      version: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
    })
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('History');
  }
};
