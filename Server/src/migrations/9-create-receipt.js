'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Receipts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            quantity: {
                type: Sequelize.INTEGER
            },
            name_product: {
                type: Sequelize.STRING
            },
            price: {
                type: Sequelize.INTEGER
            },
            id_supplier: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Suppliers',
                    key: 'id',
                },
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
        await queryInterface.dropTable('Receipts');
    }
};