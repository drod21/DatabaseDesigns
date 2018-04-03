const db = require('../db') //this is required
const Items = require('../db/models/items');
const SoldIn = require('../db/models/sold-in');

const router = require('express').Router()

router.get('/items', function(req, res, next) {
    Items.findAll({ include: SoldIn }).then((result) => {
        res.status(200).send(result);
    }).catch(next);
});

router.get('/items/:id', function(req, res, next) {
    Items.findOne({
        include: [SoldIn], 
        where:{ item_id: req.params.id },
    }).then((result) => {
        res.status(200).send(result);
    }).catch(next);
});

router.post('/items', function(req, res, next) {
    const item = req.body.item
    
    const sold = Object.assign({}, {
        item_item_id: item.item_id,
        department_dept_id: item.dept_id
    })

    Items.create(item).then((result) => {
        return SoldIn.create(sold)
    }).then((result) => {
        res.status(200).send(result);
    }).catch(next)
})

// TODO: FINISH THIS UP. It currently is not finished
// We retrieve the item, need to update/overwrite the result with the item
router.put('/items', function(req, res, next) {
    const item = req.body.item
    const sold = Object.assign({}, {
        item_item_id: item.item_id,
        department_dept_id: item.dept_id
    })

    Items.findOne({where : { item_id: item.item_id }}).then((result) => {
    }).then((result) => {
        res.status(200).send(result);
    }).catch(next)
})
/*
item = { 
    id,
    item_name,
    dept_id,
    type,
    description,
    price_public,
    price_private,
    created_at,
    updated_at
}
*/
// router.put('/items', function (req, res, next) {
//     Items.upsert(req.body.item).then((result) => {
//         res.status(200).send(result);
//     }).catch(next)
// })

module.exports = router;
