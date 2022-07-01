'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Category, { foreignKey: 'id', as: 'catedata' })
    }
  };
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    picture: DataTypes.JSON,
    content: DataTypes.TEXT,
    summary: DataTypes.TEXT,
    ram: DataTypes.STRING,
    chip: DataTypes.STRING,
    card: DataTypes.STRING,
    display: DataTypes.STRING,
    memory: DataTypes.STRING,
    port: DataTypes.STRING,
    operation: DataTypes.STRING,

    pin: DataTypes.STRING,
    dpi: DataTypes.FLOAT,
    micro_switch: DataTypes.INTEGER,
    scroll_switch: DataTypes.INTEGER,
    durability: DataTypes.INTEGER,
    keyboard_type: DataTypes.STRING,
    model: DataTypes.STRING,
    connect: DataTypes.STRING,
    weight: DataTypes.FLOAT,
    size: DataTypes.STRING,
    color: DataTypes.STRING,
    material: DataTypes.STRING,
    insurance: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    id_cate: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
    {
      sequelize,
      modelName: 'Product',
      indexes: [
        // add a FULLTEXT index
        { type: 'FULLTEXT', name: 'text_idx', fields: ['name', 'ram', 'chip', 'display', 'memory'] }
      ]
    });
  return Product;
};



