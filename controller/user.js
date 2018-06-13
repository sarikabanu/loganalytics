const mongoose = require('mongoose');
const Packet = require('../models/packet.js')
const TokenGenerator = require('uuid-token-generator');


this.pushPackets = function (req, res) {
    var item = {
        sid: req.body.sid,
        pid: req.body.pid,
        uid: req.body.uid,
        did: req.body.did,
        pt: req.body.pt,
      // Events: req.body.events
    }
    const packet = new Packet(item);
    //     person.anything = { x: [3, 4, { y: "changed" }] };
    // person.markModified('anything');
    // person.save(); // anything will now get saved
    packet.events = req.body.events
    packet.markModified('events');
    packet.save()
        .then(result => {
            res.status(200).json({ message: 'added successfully', content: '' })
        })
        .catch(err => {
            res.status(401).json({ message: 'error', content: err })
        })
}

this.getConfig = function (req, res) { }