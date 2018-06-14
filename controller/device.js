const mongoose = require('mongoose');
const Device = require('../models/device.js')



this.addDevice = function (req, res) {
    var item = {
        did: req.body.did
    }
    const device = new Device(item);
    device.save()
        .then(result => {
            res.status(200).json({ message: 'added successfully', content: '' })
        })
        .catch(err => {
            res.status(401).json({ message: 'error', content:err })
        })
}