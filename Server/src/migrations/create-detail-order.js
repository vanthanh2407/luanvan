'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Detail_Orders', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            id_order: {
                allowNull: false,
                references: {
                    model: 'Orders',
                    key: 'id',
                  },
                type: Sequelize.INTEGER
            },
            id_product: {
                allowNull: false,
                references: {
                    model: 'Products',
                    key: 'id',
                  },
                type: Sequelize.INTEGER
            },
            price: {
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            quantity: {
                type: Sequelize.INTEGER
            },
            total: {
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: true,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: true,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Detail_Orders');
    }
};