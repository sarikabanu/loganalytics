const mongoose = require('mongoose');

var Configr = mongoose.Schema({
    //project id
    pid: {
        type: String
    },
    //platform
    pf: {
        type: String,
      //default:
    },
    canCapture:{
        type: Number
    },
    // packetDuration(pd)
    pd:{
        type: Number
    },
    // maxPacketUploadCount(mpuc)
    mpuc:{
        type: Number
    },
    // hideSensitiveInformation(hsi)
    hsi:{
        type: Number
    },
    // eventsEnabled(isEnabled)
    isEnabled:{
        type: Number
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

module.exports = mongoose.model('Configr', Configr);







// projectId(pid)
// platform(pf)
// canCapture
// packetDuration(pd)
// maxPacketUploadCount(mpuc)
// hideSensitiveInformation(hsi)
// eventsEnabled(isEnabled)