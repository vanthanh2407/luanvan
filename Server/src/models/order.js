'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a src/models/order.jspart of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

        }
    };
    Order.init({
        name: DataTypes.STRING,
        address: DataTypes.STRING,
        phone: DataTypes.STRING,
        id_status: DataTypes.STRING,
        paymethod: DataTypes.BOOLEAN,
        note: DataTypes.STRING,
        total: DataTypes.INTEGER,
        id_payment: DataTypes.INTEGER,
        id_coupon: DataTypes.INTEGER,
        id_user: DataTypes.INTEGER,
        id_status: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Order',
    });
    return Order;
};