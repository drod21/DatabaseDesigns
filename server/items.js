const db = require('../db') //this is required
const Items = require('../db/models/items');
const SoldIn = require('../db/models/sold-in');
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

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

router.get('/item-range/:key/:attribute/:op', function (req, res, next) {
    const items = []
    const operator = Op[req.params.op]

    Items.findAll({
        include: [SoldIn],
        where: {
            [req.params.key]: {
             [operator]:   req.params.attribute
            }
        },
    }).then((result) => {
        console.log('result', result)
        res.status(200).send(result);
    }).catch(next);
});


router.get('/item-search/:key/:attribute', function (req, res, next) {
    if(req.params.key === 'department_dept_id') {
        Items.findAll({
            include: [{
                model: SoldIn,
                where: {
                    department_dept_id: req.params.attribute
                }
            }]
        }).then((result) => {
            res.status(200).send(result);
        }).catch(next);
    } else {
        Items.findAll({
            include: [SoldIn],
            where: {
                [req.params.key]: {
                    [Op.iLike]:  '%' + req.params.attribute + '%'
                }
            },
        }).then((result) => {
            res.status(200).send(result);
        }).catch(next);
    }
});

router.post('/items', async function(req, res, next) {
    const item = req.body.item
    
    const sold = Object.assign({}, {
        item_item_id: item.item_id,
        department_dept_id: item.dept_id
    })
    delete item.dept_id // this is a test
    await Items.create(item).then((result) => {
        return SoldIn.create(sold)
    }).then((result) => {
        return Items.findAll({ include: [SoldIn] })
    }).then((result) => {
        res.status(200).send(result);
    }).catch(next)
})

router.put('/items', async function(req, res, next) {
    const item = req.body.item
    const sold = Object.assign({}, {
        item_item_id: item.item_id,
        department_dept_id: item.dept_id
    })
    delete item.dept_id // this is a test
    await Items.findOne({ where: { item_id: item.item_id }}).then((result) => {
        const updatedItem = Object.assign(result, item)
       return updatedItem.save()
    }).then((result) => {
        return Items.findAll({ include: [SoldIn] })
    }).then((result) => {
        res.status(200).send(result);
    }).catch(next)
})

router.delete('/items/:item_id', async function (req, res, next) {
    await SoldIn.destroy({
        where: { item_item_id: req.params.item_id }
    }).catch(next);
    await Items.destroy({ 
        where: { item_id: req.params.item_id } 
    }).then((result) => {
        return Items.findAll({ include: [SoldIn] })
    }).then((result) => {
        res.status(200).send(result);
    }).catch(next);
})

module.exports = router;
