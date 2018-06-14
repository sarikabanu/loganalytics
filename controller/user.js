const mongoose = require('mongoose');
const Packet = require('../models/packet.js')
const Configr = require('../models/configuration.js')
const Device = require('../models/device.js')
const User = require('../models/user.js')
const TokenGenerator = require('uuid-token-generator');


this.pushPackets = function (req, res) {
    var item = {
        sid: req.body.sid,
        pid: req.body.pid,
        uid: req.body.uid,
        did: req.body.did,
        pt: req.body.pt
    }
    const packet = new Packet(item);
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

this.getConfig = function (req, res) {
    var resobj = new Object();
    if (req.body.uidentity && req.body.did) {                               //check for uidentity is empty from req
        User.find({ email: req.body.uidentity })
            .exec()
            .then(userRes => {
                if (userRes.length != 0) {
                    if (userRes[0].email === req.body.uidentity) {          //when identity exists
                        console.log("identity exists=======")
                        Device.find({ did: req.body.did })
                            .exec()
                            .then(devResult => {
                                if (devResult.length != 0) {                    //when device present in db
                                    console.log("device present in db=====")
                                    if (userRes[0].uid != devResult[0].uid) {
                                        console.log("update user id")
                                        Device.update({ did: req.body.did }, { $set: { uid: userRes[0].uid } })
                                            .exec()
                                            .then(updateRes => {
                                                console.log("updateRes" + JSON.stringify(updateRes))
                                            })
                                        return userRes[0].uid;
                                    }

                                }
                                else {                                           //when device is not present in db
                                    console.log("when device is not present in db")
                                    const user = new User({ email: req.body.uidentity });
                                    user.save()
                                        .then(result => {
                                            console.log(result)
                                            return result._id
                                        })
                                        .then(devRes => {
                                            resobj.uid = devRes;
                                            var item = {
                                                did: req.body.did,
                                                pf: req.body.pf,
                                                uid: devRes
                                            }
                                            const device = new Device(item);
                                            device.save()
                                                .then(result => {
                                                    //return result._id
                                                    console.log("result after device insertion" + result)
                                                })
                                            console.log("userid===" + devRes)
                                            return devRes
                                        })

                                }
                            })

                    }
                }
                else {
                    console.log("user with identity not present")           //identity not present
                    Device.find({ did: req.body.did })
                        .exec()
                        .then(result => {
                            if (result.length != 0) {
                                req.setUid = result[0].uid
                            }
                            else {
                                console.log("device not registered")
                                const user = new User({ name: "anonimous123" });
                                user.save()
                                    .then(result => {
                                        console.log(result)
                                        return result._id
                                    })
                                    .then(result2 => {
                                        req.setUid = result2
                                        console.log("userid===" + req.setUid)
                                        var item = {
                                            did: req.body.did,
                                            pf: req.body.pf,
                                            uid: result2
                                        }
                                        const device = new Device(item);
                                        device.save()
                                            .then(result => {
                                                return result._id

                                            })

                                    })

                            }
                            // return result[0].uid
                        })
                        .then(result3 => {
                          
                        })
                        .catch(err => {
                            console.log("error2" + err)
                            res.status(401).json({ message: 'error', content: err })
                        })
                }
            })
            .then(mainRes => {
                Configr.find({ pid: req.body.pid })
                    .exec()
                    .then(result4 => {
                        resobj.pd = result4[0].pd
                        resobj.canCapture = result4[0].canCapture
                        resobj.mpuc = result4[0].mpuc
                        resobj.hsi = result4[0].hsi
                        resobj.isEnabled = result4[0].isEnabled
                        resobj.uid = mainRes
                        res.status(200).json({ message: 'response data is', content: resobj })

                    })

            })
            .catch(err => {
                console.log("error1" + err)
                res.status(401).json({ message: 'error', content: err })
            })

    }
    if (!req.body.uidentity && req.body.did) {                                  //check for did is empty from req
        Device.find({ did: req.body.did })
            .exec()
            .then(result => {
                if (result.length != 0) {
                    req.setUid = result[0].uid
                }
                else {
                    console.log("device not registered")
                    const user = new User({ name: "anonimous123" });
                    user.save()
                        .then(result => {
                            console.log(result)
                            return result._id
                        })
                        .then(result2 => {
                            req.setUid = result2
                            console.log("userid===" + req.setUid)
                            var item = {
                                did: req.body.did,
                                pf: req.body.pf,
                                uid: result2
                            }
                            const device = new Device(item);
                            device.save()
                                .then(result => {
                                    return result._id

                                })

                        })

                }
                // return result[0].uid
            })
            .then(result3 => {
                Configr.find({ pid: req.body.pid })
                    .exec()
                    .then(result4 => {
                        console.log("req.body.uid@@@@@@" + req.setUid)
                        resobj.pd = result4[0].pd
                        resobj.canCapture = result4[0].canCapture
                        resobj.mpuc = result4[0].mpuc
                        resobj.hsi = result4[0].hsi
                        resobj.isEnabled = result4[0].isEnabled
                        resobj.uid = req.setUid
                        res.status(200).json({ message: 'response data is', content: resobj })

                    })
            })
            .catch(err => {
                console.log("error2" + err)
                res.status(401).json({ message: 'error', content: err })
            })
    }
    // else {
    //     console.log("device id not present")
    //     //create user with deviceid and platform
    // }

}