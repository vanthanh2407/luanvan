const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(

    'heroku_23281361c925cac',
    'bda5e15a372bbe',
    '999f1599',
    {
        host: 'us-cdbr-east-06.cleardb.net',
        dialect: 'mysql',
        logging: false,

    });


let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = connectDB;