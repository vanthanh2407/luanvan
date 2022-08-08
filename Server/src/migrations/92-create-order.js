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
            name: {
                type: Sequelize.STRING
            },
            address: {
                type: Sequelize.STRING
            },
            phone: {
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
                allowNull: true,
                references: {
                    model: 'Payments',
                    key: 'id',
                },
            },
            id_coupon: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'Coupons',
                    key: 'id',
                },
            },
            id_user: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id',
                },
            },
            id_status: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Statuses',
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