const mongoose = require('mongoose');
const jwt = require('../utils/jwt')
const pEnum = require('../utils/platformEnum')
const TokenGenerator = require('uuid-token-generator');
const uuid = require('uuid');
const Project = require('../models/projects.js')
const Configr = require('../models/configuration.js')

this.createProject = function (req, res) {
    const tokgen = new TokenGenerator(); // Default is a 128-bit token encoded in base58
    var item = {
        name: req.body.name,
        projectToken: tokgen.generate(),
        //subscid:req.body.subscid,
        subscid: "req.body.subscid",
        pid: uuid(),
        uid: req.body.uid
    }
    const project = new Project(item);
    project.save()
        .then(result => {
            return result.pid

        })
        .then(result2 => {
            pEnum.enums.forEach(function (enumItem) {
                var item = {
                    pid: result2,
                    pf: enumItem.key,
                    mpuc: 45,
                    hsi: 56,
                    canCapture: 0,
                    isEnabled: 1
                }
                const config = new Configr(item);
                config.save()
                    .then(result => {

                        //console.log(enumItem.get('1'));
                    })
                //console.log(enumItem.get('1'));
            });
            res.status(200).json({ message: 'added successfully', content: '' })
        })
        .catch(err => {
            console.log(err)
            res.status(401).json({ message: 'error', content: err })
        })
}

this.addPlatformToProject = function (req, res) { }
this.getPlatformConfigOfProject = function (req, res) { }