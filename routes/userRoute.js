const express = require('express');
const User = require('../models/userModel')
const {getToken, isAuth} = require('../util');
var bcrypt = require('bcrypt-nodejs');

const router = express.Router();

router.put('/:id', isAuth, async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: getToken(updatedUser),
      });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  });
  

router.post('/signin', async (req, res) => {
    const signinUser = await User.findOne({
        email:req.body.email
    });
    if (!signinUser) {
        return res.status(401).send({msg: 'No user found'})
    }
    if (!bcrypt.compareSync(req.body.password,signinUser.password)) {
        return res.status(401).send({msg: 'Wrong password'})
    }

    if(signinUser){
        return res.send({
            _id:signinUser._id,
            name:signinUser.name,
            email:signinUser.email,
            isAdmin:signinUser.isAdmin,
            token: getToken(signinUser)
        })
    }
    else {
        return res.status(401).send({msg: 'Invalid e-mail or password'})
    }
})

router.post('/register', async (req, res) => {
    var user= new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(5),null);

    const newUser = await user.save();
    if(newUser){
        res.send({
            _id:newUser._id,
            name:newUser.name,
            email:newUser.email,
            isAdmin:newUser.isAdmin,
            token: getToken(newUser)
        })
    }
    else {
        res.status(401).send({msg: 'Invalid User Data'})
    }
})

router.post('/createadmin', async (req, res) => {
    try{
            const adminUser = await User.findOne({
                isAdmin:true,
            });
    
            if (adminUser){
                res.status(401).send({msg:'Admin already exists'});    
            }
            else {
                var user= new User();
                user.name = req.body.name;
                user.email = req.body.email;
                user.password = bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(5),null);
                user.isAdmin = true;
                const newUSer = await user.save();
                res.send(newUSer);
            }
        } catch(error) {
            res.send({msg:error.message});
        }
})

module.exports = router;