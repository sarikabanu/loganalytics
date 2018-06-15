const mongoose = require('mongoose');

var Packet = mongoose.Schema({
    //session id
    sid: {
        type: String
    },
    //project id
    pid: {
        type: String
    },
    //user id
    uid: {
        type: String
    },
    //packet time
    pt: {
        type: String,
        
    },
    events: [mongoose.Schema.Types.Mixed],
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

module.exports = mongoose.model('Packets', Packet);


// sessionId
// projectId
// timestamp
// userId
// deviceId
// Events