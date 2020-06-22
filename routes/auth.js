const express = require('express');
const passport = require("passport");
const router = express.Router();

//  Authenticate from Google
// Get /auth/google

router.get('/google',passport.authenticate('google',{scope:['profile']})) 

//  Google Auth Callback
// Get /auth/google/callback
router.get('/google/callback',passport.authenticate('google',{
    failureRedirect:'/'
}),(req,res)=>{
    res.redirect('/dashboard');
})

// Logout the user
// Get /auth/logout
router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/');
})


module.exports = router;