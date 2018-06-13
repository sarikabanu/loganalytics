const mongoose = require('mongoose');

var Device = mongoose.Schema({
    deviceId: {
        type: String
    },
    width: {
        type: Number
    },
    height: {
        type: Number
    },
    userId: {
        type: String
    },
    platform: {
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

// deviceId
// width
// height
// userIdd
// platform(iOS, Android)
// os version (11.3, 7)
// deviceType(iPhone/iPad/Tab/AndroidMobile)