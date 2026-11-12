const express = require('express');
require('dotenv').config()
const data = require('./data');
const path = require('path')
const mongoose = require('mongoose');
const axios = require('axios');
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
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongodbUrl);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
const app = express();
app.use(bodyParser.json())
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/uploads', uploadRoute);
app.use('/api/orders', orderRoute);
app.use('/api/carts', cartRoute);
app.use('/api/expenses', expenseRoute);
app.use('/api/mutualfunds', mutualFundRoute);

// Proxy MFAPI requests through the backend to avoid browser CORS errors.
app.get('/api/mfapi/:schemeCode', async (req, res) => {
  try {
    const { schemeCode } = req.params;

    if (!/^\d+$/.test(schemeCode)) {
      return res.status(400).json({ message: 'Invalid mutual fund scheme code' });
    }

    const response = await axios.get(`https://api.mfapi.in/mf/${schemeCode}`, {
      timeout: 10000,
    });

    res.json(response.data);
  } catch (error) {
    console.error('MFAPI Error:', error.response?.status || error.message);
    res.status(error.response?.status || 500).json({
      message: 'Unable to fetch mutual fund NAV',
    });
  }
});

app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));
app.use(express.static(path.join(__dirname, './frontend/build')))
app.get('*', (req, res) => res.sendFile(path.join(__dirname, './frontend/build/index.html')))
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`xingShop Backend is listening at http://localhost:${port}`)
  })
})
