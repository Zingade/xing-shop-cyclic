const mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    name:{type: String, required: true},
    image:{type: String, required:true},
    price:{type:Number, default:0, required:true},
    popularity:{type:Number, default:0, required:true},
    category:{type:String, required:true},
    quantity: {type:String, required:true},
    description: {type:String, required:true, default:''},
});

module.exports = mongoose.model("Product", productSchema);