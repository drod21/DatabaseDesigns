const db = require('../db') //this is required
const Items = require('../db/models/items');
const Inventory = require('../db/models/inventory');

const router = require('express').Router()

router.get('/', function(req, res, next) {
    Items.findAll({
            include: [Inventory]
        })
        .then(result => {
            res.status(200).send(result);
        })
        .catch(next);
});

router.get('/:id', function(req, res, next) {
    Items.findOne({
            where:{id:req.params.id},
            include: [Inventory]
        })
        .then(result => {
            res.status(200).send(result);
        })
        .catch(next);
});

module.exports = router;
