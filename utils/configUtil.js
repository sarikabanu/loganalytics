const Configr = require('../models/configuration.js')
const Device = require('../models/device.js')
const User = require('../models/user.js')




//steps to execute the getConfig api, token
//required parameters for the logic : pid, pf and optional parameters are uidentity, did
// if block1 : find user for the given user identity
//if found get the devices belongs to the user
//loop each device to check parameter device id exists in the devices list
// if exist update that device's user id with found user id and update the row

//else block1 :
//find device for the given parameter device id
// if block2 : if device found, get user belonging to the device and update the user name with parameter user identity
// else block2 : create user and update name with parameter user identity, get user id, create device update user id in the device 


exports.getPlatformConfig = function (req) {
    var resobj = new Object();
    var status = 200
    var message = ""
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
                            // res.status(401).json({ message: 'error', content: err })
                            return 401, 'error', err
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
                       // res.status(200).json({ message: 'response data is', content: resobj })

                    })

            })
            .catch(err => {
                console.log("error1" + err)
                res.status(401).json({ message: 'error', content: err })
            })

    }
    return status, message, resobj
}