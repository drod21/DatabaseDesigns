const db = require('../db') //this is required
const Inventory = require('../db/models/inventory');
const Items = require('../db/models/items');
const Employees = require('../db/models/employees');

const router = require('express').Router();

router.get('/', function (req, res, next) {
    Employees.findAll({
        include: [Inventory]
    })
        .then(result => {
            res.status(200).send(result);
        })
        .catch(next);
});

router.get('/:id', function (req, res, next) {
    Employees.findOne({
        where: { id: req.params.id },
        include: [Inventory]
    })
        .then(result => {
            res.status(200).send(result);
        })
        .catch(next);
});

module.exports = router
