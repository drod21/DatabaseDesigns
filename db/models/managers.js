'use strict'

const Sequelize = require('sequelize')
const db = require('../index.js');

const Managers = db.define('Managers', {
	mid: Sequelize.INTEGER,
	dept_id: Sequelize.INTEGER,
})

module.exports = Managers;
