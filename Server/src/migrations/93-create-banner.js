'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Banners', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            picture: {
                type: Sequelize.STRING,
            },
            id_product: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Products',
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
        await queryInterface.dropTable('Banners');
    }
};