'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  History.init({
    authorId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    isPublic: DataTypes.BOOLEAN,
    isExpired: DataTypes.BOOLEAN,
    userList: DataTypes.STRING,
    version: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};