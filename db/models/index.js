'use strict';

const Managers = require('./managers');
const Items = require('./items');
const Employees = require('./employees');
const Departments = require('./departments');

Departments.hasMany(Employees);
Departments.hasMany(Items);
Departments.hasOne(Managers);
Employees.hasOne(Departments);
Employees.hasOne(Managers)
Items.hasOne(Depatments);
Managers.hasMany(Employees);
Managers.hasOne(Deparments);

module.exports = { Managers, Items, Employees, Departments };
