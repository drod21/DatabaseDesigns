const db = require('../db') //this is required
const Items = require('../db/models/items');

const router = require('express').Router()

router.get('/items', function(req, res, next) {
    Items.findAll().then(result => {
            res.status(200).send(result);
        })
        .catch(next);
});

router.get('/items/:id', function(req, res, next) {
    Items.findOne({
            where:{id:req.params.id},
        }).then(result => {
            res.status(200).send(result);
        }).catch(next);
});

router.put('/items/:id', function(req, res, next) {
    Items.findOne({
        where: { id: req.params.id, dept_id: req.body.dept_id }
        .then((result) => {
            res.status(200).send(result);
        }).catch(next)
    })
})

module.exports = router;
