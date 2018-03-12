'use strict';

const Inventory = require('./inventory');
const Items = require('./items');
const Employees = require('./employees');
const Departments = require('./departments');

Inventory.hasMany(Items);
Items.belongsTo(Inventory);
Inventory.belongsTo(Employees);
Employees.hasOne(Departments);
Departments.hasMany(Employees);

module.exports = { Inventory, Items, Employees, Departments };
