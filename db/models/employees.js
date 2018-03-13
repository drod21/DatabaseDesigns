'use strict'

const Sequelize = require('sequelize');
const db = require('../index.js');

const Employees = db.define('employees', {
    eid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    emp_name: Sequelize.TEXT,
    emp_pw: Sequelize.TEXT,
    dept_id: Sequelize.INTEGER,
    manager_id: Sequelize.INTEGER
});

module.exports = Employees;
