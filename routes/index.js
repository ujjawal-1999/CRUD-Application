const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');
const mongoose = require('mongoose');
const Story = require('../models/Story');
const User = require('../models/User');
//  Login Landing Page
// Get /
router.get('/',ensureGuest,(req,res)=>{
    res.render('login',{
        layout:'login'
    });
}) 

//Dashboard
// Get /dashboard
router.get('/dashboard',ensureAuth,async (req,res)=>{
    try{
        const stories = await Story.find({user:req.user.id}).lean();
        console.log(stories);
        res.render('dashboard',{
            name:req.user.firstName,
            stories:stories
        });
    } 
    catch(err){
        console.error(err);
        res.render('error/500');
    }
})


module.exports = router;