const express = require('express');
const router = express.Router();
var controller = require('../controller/projects')


router.post('/createProject',(req,res)=>{
if(req.jwtToken.email==='gowravitest@gmail.com'){
 controller.createProject(req, res)
}
})

router.post('/addPlatformToProject',(req,res)=>{
if(req.jwtToken.email==='gowravitest@gmail.com'){
 controller.addPlatformToProject(req, res)
}
})

router.post('/getPlatformConfigOfProject',(req,res)=>{
if(req.jwtToken.email==='gowravitest@gmail.com'){
 controller.getPlatformConfigOfProject(req, res)
}
})




module.exports = router