const express = require('express');
require('dotenv').config()
const Order = require('../models/orderModel')
const {getToken, isAuth, isAdmin} = require('../util');

const router = express.Router();

router.get('/', async (req, res) => {
    const orders = await Order.find({});
    res.send(orders);
});

router.post("/", isAuth, async (req, res)=>{
  const order = new Order({
    orderUserName:req.body.orderUserName,
    orderDate:req.body.orderDate,
    noOfItems:req.body.noOfItems,
    aproxPrice:req.body.aproxPrice,
    cartItemsString: req.body.cartItemsString,
  })
  
  const newOrder = await order.save(); 
  if(newOrder){
      return res.status(200).send({message: 'New Order Created', data: newOrder});
  }
  return res.status(500).send({message:'Error creating order in database!'});
})

router.delete("/:id", isAuth, isAdmin, async (req, res)=>{
  const orderId = req.params.id;
  const order = await Order.findOne({_id:orderId});
  if(order){
      order.remove();
      res.send({message:"Order Deleted!"});
  }
  else{
      res.send({message:"Error in Order Deletion!"});
  }
})


module.exports = router;