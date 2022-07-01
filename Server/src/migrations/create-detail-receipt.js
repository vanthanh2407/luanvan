'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Detail_Receipts', {
            id_receipt: {
                allowNull: false,

                primaryKey: true,
                type: Sequelize.INTEGER
            },
            id_product: {
                allowNull: false,

                primaryKey: true,
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