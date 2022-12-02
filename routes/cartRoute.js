const express = require('express');
require('dotenv').config()
const Cart = require('../models/cartModel')
const { isAuth } = require('../util');

const router = express.Router();

router.get('/', async (req, res) => {
    const cartItems = await Cart.find({userName: req.headers.username,});
    res.send(cartItems);
  });
  
router.get('/:id', async (req, res) => {
    const userName = req.params.id;

    const userCartItems = await Cart.find({userName:userName});
    if (userCartItems) {
        res.send(userCartItems);
    }
    else {
        res.status(404).send({msg:"Cart Not Found!"});
    }
});

router.post("/", isAuth, async (req, res)=>{

    const cartItem = await Cart.findOne({
        userName: req.body.userName,
        product:req.body.product,
    });

    if(cartItem){
        cartItem.name = req.body.name;
        cartItem.image = req.body.image;
        cartItem.price = req.body.price;
        cartItem.quantity = req.body.quantity;
        cartItem.category = req.body.category;
        cartItem.noOfItems = req.body.noOfItems;
        const updatedCart = await cartItem.save();
        if(updatedCart){
            return res.status(201).send({message:'Cart updated!', data:updatedCart})
        }
        return res.status(500).send({message:'Error in updating cart!'})
    }
    else {
        const newCartItem = new Cart({
            userName: req.body.userName,
            product:req.body.product,
            name:req.body.name,
            image:req.body.image,
            price:req.body.price,
            category:req.body.category,
            quantity: req.body.quantity,
            noOfItems: req.body.noOfItems,
        })
        const newCart = await newCartItem.save(); 
        if(newCart){
            return res.status(200).send({message: 'New Cart Created', data: newCart});
        }
        return res.status(500).send({message:'Error creating cart in database!'});
        }
})

router.delete("/:id", isAuth, async (req, res)=>{
    if(req.params.id == -1){
        await Cart.deleteMany({userName: req.headers.username});
        return res.status(200).send({message: 'All Cart contents deleted!'});
    }
    else{
            const cartItem = await Cart.findOne({
                userName: req.headers.username,
                product:req.params.id,
            });
            if(cartItem){
                cartItem.remove();
                return res.send({message:"Cart Deleted!"});
            }
            else{
                return res.send({message:"Error in Cart Deletion!"});
            }
        }
})


module.exports = router;