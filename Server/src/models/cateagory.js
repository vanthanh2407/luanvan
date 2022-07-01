'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.belongsTo(models.Product, {foreignKey: 'id', targetKey: 'id_cate', as: 'catedata'})
    }
  };
  Category.init({
    category: DataTypes.STRING,
  }, 
  {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};