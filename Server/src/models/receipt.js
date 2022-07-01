'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Receipt extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

        }
    };
    Receipt.init({
        name_product: DataTypes.STRING,
        date_import: DataTypes.DATE,
        price: DataTypes.INTEGER,
        id_supplier: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Receipt',
    });
    return Receipt;
};