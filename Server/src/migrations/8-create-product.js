'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      picture: {
        type: Sequelize.JSON
      },
      content: {
        type: Sequelize.TEXT
      },
      summary: {
        type: Sequelize.TEXT
      },
      ram: {
        type: Sequelize.STRING
      },
      chip: {
        type: Sequelize.STRING
      },
      card: {
        type: Sequelize.STRING
      },
      display: {
        type: Sequelize.STRING
      },
      memory: {
        type: Sequelize.STRING
      },
      port: {
        type: Sequelize.STRING
      },
      operation: {
        type: Sequelize.STRING
      },
      pin: {
        type: Sequelize.STRING
      },
      dpi: {
        type: Sequelize.FLOAT
      },
      micro_switch: {
        type: Sequelize.INTEGER
      },
      scroll_switch: {
        type: Sequelize.INTEGER
      },
      durability: {
        type: Sequelize.INTEGER
      },
      keyboard_type: {
        type: Sequelize.STRING
      },
      model: {
        type: Sequelize.STRING
      },
      connect: {
        type: Sequelize.STRING
      },
      weight: {
        type: Sequelize.FLOAT
      },
      size: {
        type: Sequelize.STRING
      },
      color: {
        type: Sequelize.STRING
      },
      material: {
        type: Sequelize.STRING
      },
      insurance: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.BOOLEAN
      },
      id_cate: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'categories',
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
    }).then(() => queryInterface.addIndex('Products', ['name', 'ram','chip', 'memory','display'], { type: 'FULLTEXT' }));
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};