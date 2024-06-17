const { Schema, model } = require('mongoose');

const CartSchema = new Schema({
    foods: [{
        type: Schema.Types.ObjectId,
        ref: 'Food'
    }],
    total: {
        type: Number,
        default: 0
    }
});

const CartModel = model('Cart', CartSchema);

module.exports = CartModel;