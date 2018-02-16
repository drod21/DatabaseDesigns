'use strict';

const Inventory = require('./inventory');
const Items = require('./items');
const Employees = require('./employees');

Inventory.hasMany(Items);
Items.belongsTo(Inventory);
Inventory.belongsTo(Employees);

module.exports = { Inventory, Items, Employees };
