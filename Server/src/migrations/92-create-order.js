'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Orders', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            create_time: {
                type: Sequelize.DATE
            },
            address: {
                type: Sequelize.STRING
            },
            status: {
                type: Sequelize.STRING
            },
            paymethod: {
                type: Sequelize.BOOLEAN
            },
            note: {
                type: Sequelize.STRING
            },
            total: {
                type: Sequelize.INTEGER
            },
            id_payment: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'payments',
                    key: 'id',
                },
            },
            id_coupon: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'coupons',
                    key: 'id',
                },
            },
            id_user: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
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
        await queryInterface.dropTable('Orders');
    }
};