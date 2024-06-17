const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors')

const indexRouter = require('./routes/index');
const cartRouter = require('./routes/cart')
const foodsRouter = require('./routes/foods');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/food_ordering')

const app = express();

app.use(logger('dev'));
app.use(express.json())
app.use(cors())

app.use('/api/foods', foodsRouter);
app.use('/api/carts', cartRouter);
app.use('/api', indexRouter);

app.listen(3000, () => {
    console.log(`App listening to PORT 3000`);
})
