'use strict'

const Sequelize = require('sequelize')
const db = require('../index.js');

const Managers = db.define('Managers', {
	mid: { 
		type: Sequelize.INTEGER,
		primaryKey: true
	},
	name: Sequelize.TEXT,
})

module.exports = Managers;
