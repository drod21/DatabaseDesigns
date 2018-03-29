'use strict'

const Sequelize = require('sequelize');
const db = require('../index.js');

const Employees = db.define('Employees', {
    eid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    email: Sequelize.TEXT,
    emp_name: Sequelize.TEXT,
    emp_pw: Sequelize.TEXT,
});

module.exports = Employees;
