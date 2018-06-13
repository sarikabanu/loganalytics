const express = require('express');
const router = express.Router();
var controller = require('../controller/login')

router.post('/userSignUp',(req,res)=>{
 controller.userSignUp(req, res)
})

router.post('/userSignIn',(req,res)=>{
 controller.userSignIn(req, res)
})


module.exports = router