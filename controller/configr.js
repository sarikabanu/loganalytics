const mongoose = require('mongoose');
const Configr = require('../models/configuration.js');


this.addConfig = function (req, res) {
    var item = {
        pid: req.body.pid,
        pf: req.body.pf,
        pd: req.body.pd,
        mpuc: req.body.mpuc,
        hsi: req.body.hsi,
        canCapture:req.body.canCapture,
        isEnabled:req.body.isEnabled
    }
    const configr = new Configr(item);
    configr.save()
        .then(result => {
            res.status(200).json({ message: 'added successfully', content: '' })
        })
        .catch(err => {
            res.status(401).json({ message: 'error', content: err })
        })
}