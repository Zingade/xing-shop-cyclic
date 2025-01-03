const express = require('express');
require('dotenv').config()
const Expense = require('../models/expenseModel')
const {isAuth, isAdmin} = require('../util');

const router = express.Router();

router.get('/', async (req, res) => {
    const category = req.query.category ? { category: req.query.category } : {};
    const occurance = req.query.occurance ? { occurance: req.query.occurance } : {};
    const frequency = req.query.frequency ? { frequency: req.query.frequency } : {};
    const requiredType = req.query.requiredType ? { requiredType: req.query.requiredType } : {};
    const orderFor = req.query.orderFor ? { orderFor: req.query.orderFor } : {};
    const startDate = req.query.startDate ? new Date(req.query.startDate) : '';
    const endDate = req.query.endDate ? new Date(req.query.endDate) : '';
    const expenseDate = (req.query.startDate || req.query.endDate)? {expenseDate:{$gte:startDate.toISOString(), $lte:endDate.toISOString()}}:{} 
    const expenses = await Expense.find({
        ...category,...frequency,...occurance,...requiredType,...orderFor,...expenseDate
    }).sort({"_id":-1});
    res.send(expenses);
  });
  
router.get('/:id', async (req, res) => {
    const expenseId = req.params.id;

    const expense = await Expense.findOne({_id:expenseId});
    if (expense) {
        res.send(expense);
    }
    else {
        res.status(404).send({msg:"Expense Not Found!"});
    }
});

router.post("/", isAuth, isAdmin, async (req, res)=>{
    const expense = new Expense({
        details: req.body.details,
        amount:req.body.amount,
        expenseDate:req.body.expenseDate,
        card:req.body.card,
        category:req.body.category,
        requiredType: req.body.requiredType,
        orderFor: req.body.orderFor,
        occurance: req.body.occurance,
        frequency: req.body.frequency,
    })
    const newExpense = await expense.save(); 
    if(newExpense){
        return res.status(200).send({message: 'New Expense is stored', data: newExpense});
    }
    return res.status(500).send({message:'Error storing expense in database!'});
})

router.put("/:id", isAuth, isAdmin, async (req, res)=>{
    const expenseId = req.params.id;
    const expense = await Expense.findOne({_id:expenseId});
    if(expense){
        expense.details = req.body.details;
        expense.amount = req.body.amount;
        expense.expenseDate = req.body.expenseDate;
        expense.card = req.body.card;
        expense.category = req.body.category;
        expense.requiredType = req.body.requiredType;
        expense.orderFor = req.body.orderFor;
        expense.occurance = req.body.occurance;
        expense.frequency = req.body.frequency;
        const updatedExpense = await expense.save();
        if(updatedExpense){
            return res.status(201).send({message:'Expense updated!', data:updatedExpense})
        }
        return res.status(500).send({message:'Error in updating Expense!'})
    }
})

router.delete("/:id", isAuth, isAdmin, async (req, res)=>{
    const expenseId = req.params.id;
    const expennse = await Expense.findOne({_id:expenseId});
    if(expennse){
        expennse.remove();
        res.send({message:"Expense Deleted!"});
    }
    else{
        res.send({message:"Error in Expense Deletion!"});
    }
})


module.exports = router;