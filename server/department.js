const db = require('../db') 
const Employees = require('../db/models/employees');

const router = require('express').Router();

router.get('/', function (req, res, next) {
  Department.findAll()
    .then(result => {
      res.status(200).send(result);
    })
    .catch(next);
});

router.get('/:id', function (req, res, next) {
  Department.findOne({
    where: { dept_id: req.params.id }
  })
    .then(result => {
      res.status(200).send(result);
    })
    .catch(next);
});

module.exports = router
