const mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    orderUserName:{type: String, required: true},
    orderDate:{type: Date, required:true},
    noOfItems:{type:Number, default:0, required:true},
    aproxPrice:{type:String, required:true},
    cartItemsString: {type:String, required:true},
});

module.exports = mongoose.model("Order", orderSchema);