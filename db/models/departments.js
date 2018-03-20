'use strict'

const Sequelize = require('sequelize');
const db = require('../index.js');

const Departments = db.define('Departments', {
  dept_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.TEXT
});

module.exports = Departments;
