const Sequelize = require('sequelize');
const db = require('./db');

const Answer =  db.define("answers", {
    body: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    questionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});

//Create table
Answer.sync();
// Check if there is any change in the table, and if so, make the change
//Answer.sync({alter: true, force: true});

module.exports = Answer;