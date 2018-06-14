const express = require('express');
const router = express.Router();
var controller = require('../controller/device')


router.post('/addDevice',(req,res)=>{
if(req.jwtToken.email==='gowravitest@gmail.com'){
 controller.addDevice(req, res)
}
})




module.exports = router