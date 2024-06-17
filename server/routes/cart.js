const express = require('express')
const router = express.Router()

const Cart = require('../models/cart')
const Food = require('../models/foods')

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await Cart.findById(id).populate('foods');
        if (!cart) {
            res.status(404).json({ err: 'Cart not found' });
        } else {
            res.status(200).json(cart);
        }
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

// Create a new cart
router.post('/', async (req, res) => {
    try {
        const cart = await Cart.create(req.body);
        res.status(201).json(cart);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});


// Add a food item to a cart
router.post('/66708950c6864d56ff8df7a2/foods/:foodId', async (req, res) => {
    try {
        const { foodId } = req.params;
        const cart = await Cart.findById('66708950c6864d56ff8df7a2');
        if (!cart) {
            res.status(404).json({ err: 'Cart not found' });
        } else {
            const food = await Food.findById(foodId);
            if (!food) {
                res.status(404).json({ err: 'Food not found' });
            } else {
                cart.foods.push(food._id);
                cart.total += food.price;
                await cart.save();
                res.status(201).json(cart);
            }
        }
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

// Remove a food item from a cart
router.delete('/66708950c6864d56ff8df7a2/foods/:foodId', async (req, res) => {
    try {
        const { foodId } = req.params;
        const cart = await Cart.findById('66708950c6864d56ff8df7a2');
        if (!cart) {
            res.status(404).json({ err: 'Cart not found' });
        } else {
            const food = await Food.findById(foodId);
            if (!food) {
                res.status(404).json({ err: 'Food not found' });
            } else {
                cart.foods.pull(food._id);
                cart.total -= food.price;
                await cart.save();
                res.status(200).json(cart);
            }
        }
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

module.exports = router;