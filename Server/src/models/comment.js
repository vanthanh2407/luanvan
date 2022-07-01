'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

        }
    };
    Comment.init({
        content: DataTypes.TEXT,
        date: DataTypes.DATE,
        star: DataTypes.INTEGER,
        status: DataTypes.BOOLEAN,
        id_product: DataTypes.INTEGER,
        id_user: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Comment',
    });
    return Comment;
};