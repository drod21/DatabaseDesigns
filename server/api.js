const api = module.exports = require('express').Router()
const items = require('./items');
const managers = require('./managers');
const employees = require('./employees');
const login = require('./login');
const departments = require('./department');
// import products from './products';
api
  .get('/items', items)
  .get('/items/:id', items)
  .delete('/items/:item_id', items)
  .get('/item-range/:key/:attribute/:op', items)
  .get('/item-search/:key/:attribute', items)
  .post('/items', items)
  .put('/items', items)
  .get('/departments', departments)
  .get('/departments/:id', departments)
  .get('/managers', managers)
  .get('/managers/:id', managers)
  .get('/employees', employees)
  .get('/employees/:id', employees)
  .put('/login', login)

// No routes matched? 404.
api.use((req, res) => res.status(404).end())
