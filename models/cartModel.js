const mongoose = require('mongoose');

var cartSchema = new mongoose.Schema({
    userName:{type: String, required: true},
    product:{type: String, required: true},
    name:{type: String, required:true},
    image:{type: String, required:true},
    price:{type:Number, default:0, required:true},
    quantity: {type:String, required:true},
    category:{type:String, required:true},
    noOfItems: {type:Number, required:true},
});

module.exports = mongoose.model("Cart", cartSchema);