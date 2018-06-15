const mongoose = require('mongoose');
const Packet = require('../models/packet.js')
const Configr = require('../models/configuration.js')
const Device = require('../models/device.js')
const User = require('../models/user.js')
const Session = require('../models/session.js')
const TokenGenerator = require('uuid-token-generator');


this.pushPackets = function (req, res) {
    req.body.events.sort(function (x, y) {
        return y.t - x.t;
    })
    //console.log(JSON.stringify(req.body.events))
    Session.find({ sid: req.body.sid })
        .exec()
        .then(result => {
            if (result.length != 0) {           //when session present

                Session.update({ sid: req.body.sid }, { $set: { endTime:req.body.events[0].t  } })
                    .exec()
                    .then(updateRes => {
                        return updateRes
                    })
                    .then(result2 => {
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
                    })

            }
            else {
                var sessinData = {
                    sid: req.body.sid,
                    pid: req.body.pid,
                    startTime: req.body.pt,
                    endTime: req.body.events[0].t,
                    did: req.body.did
                }                                           //session is not present
                const session = new Session(sessinData);
                session.save()
                    .then(result => {
                        return result
                    })
                    .then(result2 => {
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
                    })
            }
        })
        .catch(err => {
            res.status(401).json({ message: 'error', content: err })
        })
}


this.getConfig = function (req, res) {
    var resobj = new Object();
    if (req.body.uidentity && req.body.did) {                               //check for uidentity is empty from req
        User.find({ uidentity: req.body.uidentity })
            .exec()
            .then(userRes => {
                console.log("userRes.length======" + userRes.length)
                if (userRes.length != 0) {
                    if (userRes[0].uidentity === req.body.uidentity) {          //when identity exists
                        console.log("identity exists=======")
                        Device.find({ did: req.body.did })
                            .exec()
                            .then(devResult => {
                                if (devResult.length != 0) {                    //when device present in db
                                    console.log("device present in db=====")
                                    console.log("userRes[0].uid" + userRes[0]._id)
                                    if (userRes[0]._id != devResult[0].uid) {
                                        console.log("update user id")
                                        Device.update({ did: req.body.did }, { $set: { uid: userRes[0]._id } })
                                            .exec()
                                            .then(updateRes => {
                                                console.log("updateRes" + JSON.stringify(updateRes))
                                                Configr.find({ pid: req.body.pid })
                                                    .exec()
                                                    .then(result4 => {
                                                        resobj.pd = result4[0].pd
                                                        resobj.canCapture = result4[0].canCapture
                                                        resobj.mpuc = result4[0].mpuc
                                                        resobj.hsi = result4[0].hsi
                                                        resobj.isEnabled = result4[0].isEnabled
                                                        resobj.uid = userRes[0]._id
                                                        res.status(200).json({ message: 'response data is', content: resobj })

                                                    })
                                            })

                                    }
                                    else {
                                        Configr.find({ pid: req.body.pid })
                                            .exec()
                                            .then(result4 => {
                                                resobj.pd = result4[0].pd
                                                resobj.canCapture = result4[0].canCapture
                                                resobj.mpuc = result4[0].mpuc
                                                resobj.hsi = result4[0].hsi
                                                resobj.isEnabled = result4[0].isEnabled
                                                resobj.uid = userRes[0]._id
                                                res.status(200).json({ message: 'response data is', content: resobj })

                                            })
                                    }

                                }
                                else {                                           //when device is not present in db
                                    console.log("when device is not present in db")
                                    User.find({ uidentity: req.body.uidentity })
                                        .exec()
                                        .then(userRes => {
                                            console.log("userRes====" + userRes[0]._id)
                                            return userRes[0]._id
                                        })
                                        .then(devRes => {
                                            var item = {
                                                did: req.body.did,
                                                pf: req.body.pf,
                                                uid: devRes
                                            }
                                            const device = new Device(item);
                                            device.save()
                                                .then(result => {
                                                    //return result._id
                                                    Configr.find({ pid: req.body.pid })
                                                        .exec()
                                                        .then(result4 => {
                                                            resobj.pd = result4[0].pd
                                                            resobj.canCapture = result4[0].canCapture
                                                            resobj.mpuc = result4[0].mpuc
                                                            resobj.hsi = result4[0].hsi
                                                            resobj.isEnabled = result4[0].isEnabled
                                                            resobj.uid = devRes
                                                            res.status(200).json({ message: 'response data is', content: resobj })

                                                        })

                                                })

                                        })

                                }
                            })

                    }
                }
                else {
                    console.log("user with identity not present")           //identity not exixists
                    Device.find({ did: req.body.did })
                        .exec()
                        .then(result => {
                            setuid = "identity not exixists"
                            User.update({ _id: result[0].uid }, { $set: { uidentity: req.body.uidentity } })
                                .exec()
                                .then(updateRes => {
                                    console.log("updateRes" + JSON.stringify(updateRes))
                                    Configr.find({ pid: req.body.pid })
                                        .exec()
                                        .then(result4 => {
                                            resobj.pd = result4[0].pd
                                            resobj.canCapture = result4[0].canCapture
                                            resobj.mpuc = result4[0].mpuc
                                            resobj.hsi = result4[0].hsi
                                            resobj.isEnabled = result4[0].isEnabled
                                            resobj.uid = result[0].uid
                                            res.status(200).json({ message: 'response data is', content: resobj })

                                        })

                                })
                        })
                        .catch(err => {
                            console.log("error2" + err)
                            res.status(401).json({ message: 'error', content: err })
                        })
                }
            })
            .catch(err => {
                console.log("error1" + err)
                res.status(401).json({ message: 'error', content: err })
            })

    }
    if (!req.body.uidentity && req.body.did) {                                  //check for did is empty from req
        var resData = new Object()
        Device.find({ did: req.body.did })
            .exec()
            .then(result => {
                if (result.length != 0) {               //if device present in db
                    Configr.find({ pid: req.body.pid })
                        .exec()
                        .then(result4 => {
                            resobj.pd = result4[0].pd
                            resobj.canCapture = result4[0].canCapture
                            resobj.mpuc = result4[0].mpuc
                            resobj.hsi = result4[0].hsi
                            resobj.isEnabled = result4[0].isEnabled
                            resobj.uid = result[0].uid
                            res.status(200).json({ message: 'response data is', content: resobj })

                        })

                }
                else {
                    console.log("device not registered")
                    const user = new User({ name: "anonimous", uidentity: '' });
                    user.save()
                        .then(result => {
                            console.log(result)
                            resData.setUid = result._id
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
                                    Configr.find({ pid: req.body.pid })
                                        .exec()
                                        .then(result4 => {
                                            resobj.pd = result4[0].pd
                                            resobj.canCapture = result4[0].canCapture
                                            resobj.mpuc = result4[0].mpuc
                                            resobj.hsi = result4[0].hsi
                                            resobj.isEnabled = result4[0].isEnabled
                                            resobj.uid = result2
                                            res.status(200).json({ message: 'response data is', content: resobj })

                                        })
                                })

                        })

                }
            })
            .catch(err => {
                console.log("error2" + err)
                res.status(401).json({ message: 'error', content: err })
            })
    }


}