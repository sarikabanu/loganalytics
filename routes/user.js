const express = require('express');
const router = express.Router();
var controller = require('../controller/user')


router.post('/pushPackets',(req,res)=>{
 controller.pushPackets(req, res)

})





module.exports = router