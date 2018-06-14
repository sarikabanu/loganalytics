const express = require('express');
const router = express.Router();
var controller = require('../controller/configr')


router.post('/addConfig',(req,res)=>{
 controller.addConfig(req, res)

})





module.exports = router