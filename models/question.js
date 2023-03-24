const Sequelize = require('sequelize');
const db = require('./db');

const Question = db.define('question', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false, // not defind false
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
});

//Create table
Question.sync();
// Check if there is any change in the table, and if so, make the change
//Question.sync({alter: true, force: true});

module.exports = Question;