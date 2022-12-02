const mongoose = require('mongoose');

var mutualFundSchema = new mongoose.Schema({
    name:{type: String, required: true},
    amount:{type:Number, default:0, required:true},
    mutualFundDate:{type:Date, required:true},
    apiLink:{type: String, required: true},
    units:{type:Number, default:0, required:true},
});

module.exports = mongoose.model("MutualFund", mutualFundSchema);