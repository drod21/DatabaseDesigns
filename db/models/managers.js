'use strict'

const Sequelize = require('sequelize')
const db = require('../index.js');

const Managers = db.define('managers', {
	mid: Sequelize.INTEGER,
	dept_id: Sequelize.INTEGER,
})

module.exports = Managers;
