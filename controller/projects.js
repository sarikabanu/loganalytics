const mongoose = require('mongoose');
const Project = require('../models/projects.js')
const jwt = require('../utils/jwt')
const TokenGenerator = require('uuid-token-generator');
const uuid = require('uuid');

this.createProject = function (req, res) {
const tokgen = new TokenGenerator(); // Default is a 128-bit token encoded in base58
console.log(tokgen.generate())
    var item = {
        name: req.body.name,
        projectToken: tokgen.generate(),
        subscid:req.body.subscid,
        pid:uuid(),
        uid:req.body.uid
    }
    const project = new Project(item);
    project.save()
        .then(result => {
            res.status(200).json({ message: 'added successfully', content: '' })
        })
        .catch(err => {
            res.status(401).json({ message: 'error', content:err })
        })
}

this.addPlatformToProject = function (req, res) {}
this.getPlatformConfigOfProject = function (req, res) {}