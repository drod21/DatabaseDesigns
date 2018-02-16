'use strict'

const Sequelize = require('sequelize')
const db = require('../index.js');

const Inventory = db.define('inventory', {
	item_id: {
		type: Sequelize.INTEGER,
		primaryKey: true
	},
	dept_id: Sequelize.INTEGER,
	price_private: Sequelize["DOUBLE PRECISION"],
	quantity: Sequelize.INTEGER,
	emp_id: Sequelize.INTEGER
})

module.exports = Inventory;
