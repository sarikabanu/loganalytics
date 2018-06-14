const express = require('express');
const router = express.Router();
var controller = require('../controller/user')


router.post('/pushPackets',(req,res)=>{
 controller.pushPackets(req, res)

})
router.post('/getConfig',(req,res)=>{
 controller.getConfig(req, res)

})





module.exports = router