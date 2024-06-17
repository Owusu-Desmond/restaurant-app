const express = require('express');
const router = express.Router();

const Food = require("../models/foods");

router.get('/', async (req, res) => {
    try {
        const foods = await Food.find({});
        res.status(200).json(foods)
    } catch (err) {
        res.status(500).json({err : err.message})
    }
})

router.post('/', async (req, res) => {
    try {
        const {name, desc, price, ingredients } = req.body;
        if (req.query.many) {
            const foods = req.body
            await Food.insertMany(foods)
            res.status(201).json({ message: "Foods created successfully"})
        } else {
            const food = await Food.create({name, desc, price, ingredients})
            food.save()
            res.status(201).json({ message: "Food created successfully"})
        }
    } catch (err) {
        res.status(500).json({err : err.message})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const food = await Food.findOne({_id: id});
        if (food) {
            await Food.deleteOne({_id: id });
            res.status(201).json({message: 'Food deleted successfully'})
        } else {
            res.status(401).json({err: 'Food can not be found'})
        }
    } catch (err) {
        res.status(500).json({err : err.message})
    }
})

module.exports = router; 