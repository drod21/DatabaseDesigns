const api = module.exports = require('express').Router()
const items = require('./items');
const inventory = require('./inventory');
const employees = require('./employees');
// import products from './products';
api
  .get('/express-test', (req, res) => res.send({express: 'working!'})) //demo route to prove api is working
  .use('/items', items)
  .use('./inventory', inventory)
  .use('/employees', employees)
// No routes matched? 404.
api.use((req, res) => res.status(404).end())
