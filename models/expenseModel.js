const mongoose = require('mongoose');

var expenseSchema = new mongoose.Schema({
    details:{type: String, required: true},
    amount:{type: Number, default:0, required:true},
    expenseDate:{type:Date, required:true},
    card:{type: String, required: true},
    category:{type:String, required:true},
    requiredType: {type:String, required:true},
    orderFor: {type:String, required:true},
    occurance: {type:String, required:true},
    frequency: {type:String, required:true},
});

module.exports = mongoose.model("Expense", expenseSchema);