const express = require('express');
require('dotenv').config()
const MutualFund = require('../models/mutualFundModel')
const {isAuth, isAdmin} = require('../util');

const router = express.Router();

router.get('/', async (req, res) => {
    const mutualFunds = await MutualFund.find({}).sort({"amount":-1});;
    res.send(mutualFunds);
  });
  
router.get('/:id', async (req, res) => {
    const mutualFundId = req.params.id;

    const mutualFund = await MutualFund.findOne({_id:mutualFundId});
    if (mutualFund) {
        res.send(mutualFund);
    }
    else {
        res.status(404).send({msg:"Expense Not Found!"});
    }
});

router.post("/", isAuth, isAdmin, async (req, res)=>{
    const mutualFund = new MutualFund({
        name: req.body.name,
        amount:req.body.amount,
        mutualFundDate:req.body.mutualFundDate,
        apiLink:req.body.apiLink,
        units:req.body.units,
    })
    const newMutualFund = await mutualFund.save(); 
    if(newMutualFund){
        return res.status(200).send({message: 'New Mutual Fund is stored', data: newMutualFund});
    }
    return res.status(500).send({message:'Error storing mutual fund in database!'});
})

router.put("/:id", isAuth, isAdmin, async (req, res)=>{
    const mutualFundId = req.params.id;
    const mutualFund = await MutualFund.findOne({_id:mutualFundId});
    if(mutualFund){
        mutualFund.name = req.body.name;
        mutualFund.amount = req.body.amount;
        mutualFund.apiLink = req.body.apiLink;
        mutualFund.mutualFundDate = req.body.mutualFundDate;
        mutualFund.units = req.body.units;
        const updatedMutualFund = await mutualFund.save();
        if(updatedMutualFund){
            return res.status(201).send({message:'Mutual Fund updated!', data:updatedMutualFund})
        }
        return res.status(500).send({message:'Error in updating Mutual Fund!'})
    }
})

router.delete("/:id", isAuth, isAdmin, async (req, res)=>{
    const mutualFundId = req.params.id;
    const mutualFund = await MutualFund.findOne({_id:mutualFundId});
    if(mutualFund){
        mutualFund.remove();
        res.send({message:"Mutual Fund Deleted!"});
    }
    else{
        res.send({message:"Error in Mutual Fund Deletion!"});
    }
})


module.exports = router;