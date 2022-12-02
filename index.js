const express = require('express');
require('dotenv').config()
const data = require('./data');
const path = require('path')
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const bodyParser = require('body-parser');
const uploadRoute = require('./routes/uploadRoute');
const orderRoute = require('./routes/orderRoute');
const cartRoute = require('./routes/cartRoute');
const expenseRoute = require('./routes/expenseRoute')
const mutualFundRoute = require('./routes/mutualFundRoute')

const port = process.env.PORT || 5000;
const mongodbUrl = process.env.MONGODB_URL || 'mongodb://localhost/xing-shop';
mongoose.connect(mongodbUrl,{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
.catch(error => console.log(error.reason));

const app = express();

app.use(bodyParser.json())
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/uploads', uploadRoute);
app.use('/api/orders', orderRoute);
app.use('/api/carts', cartRoute);
app.use('/api/expenses', expenseRoute);
app.use('/api/mutualfunds', mutualFundRoute);

app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));
app.use(express.static(path.join(__dirname, './frontend/build')))
app.get('*', (req, res) => res.sendFile(path.join(__dirname, './frontend/build/index.html')))


app.listen(port, () => {
    console.log(`xingShop Backend is listening at http://localhost:${port}`)
  })