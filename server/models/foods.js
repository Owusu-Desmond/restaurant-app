const { Schema, model} = require("mongoose");


const foodSchema = new Schema({
    name: { type: String, require: true},
    desc: { type: String, require: true},
    price: { type: Number},
    ingredients: { type: Array}
})

const FoodModel = model('Food', foodSchema)

module.exports = FoodModel;
