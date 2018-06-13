const mongoose = require('mongoose');
const Project = require('../models/projects.js')
const jwt = require('../utils/jwt')
const TokenGenerator = require('uuid-token-generator');


this.createProject = function (req, res) {
const tokgen = new TokenGenerator(); // Default is a 128-bit token encoded in base58
console.log(tokgen.generate())
    var item = {
        name: req.body.name,
        projectToken: tokgen.generate()
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