const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('guideQuestion', 'root', '@Dark980', {
    host: 'localhost',
    port:3306,
    dialect: 'mysql'
});

module.exports = sequelize;