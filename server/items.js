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

router.put('/items/:id', function(req, res, next) {
    const item = Object.assign({}, {
        item_id: res.body.item_id,
        type: res.body.type,
        description: res.body.description,
        name: res.body.name,
        price_public: res.body.price_public,
        price_private: res.body.price_private,
        created_at: res.body.created_at,
        updated_at: res.body.updated_at
    })

    const sold = Object.assign({}, {
        item_item_id: item.item_id,
        department_dept_id: res.body.dept_id
    })

    Items.create(item).then((result) => {
        return SoldIn.create(sold)
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
