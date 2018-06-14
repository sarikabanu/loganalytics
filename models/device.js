const mongoose = require('mongoose');

var Device = mongoose.Schema({
    did: {
        type: String
    },
    width: {
        type: Number
    },
    height: {
        type: Number
    },
    uid: {
        type: String
    },
    pf: {
        type: String
    },
    osVersion: {
        type: String
    },
    deviceType: {
        type: String
    },
    createdBy: {
        type: String
    },
    modifiedBy: {
        type: String
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    modifiedDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Device', Device);
// deviceId
// width
// height
// userIdd
// platform(iOS, Android)
// os version (11.3, 7)
// deviceType(iPhone/iPad/Tab/AndroidMobile)