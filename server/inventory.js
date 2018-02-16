const db = require('../db') //this is required
const Inventory = require('../db/models/inventory');
const Items = require('../db/models/items');

const router = require('express').Router()

router.get('/', function(req, res, next) {
    Inventory.findAll({
            include: [Items]
        })
        .then(result => {
            res.status(200).send(result);
        })
        .catch(next);
});

router.get('/:id', function(req, res, next) {
    Inventory.findOne({
            where:{id:req.params.id},
            include: [Items]
        })
        .then(result => {
            res.status(200).send(result);
        })
        .catch(next);
});

module.exports = router
