'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Detail_Receipts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            id_receipt: {
                allowNull: false,
                references: {
                    model: 'Suppliers',
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
        await queryInterface.dropTable('Detail_Receipts');
    }
};