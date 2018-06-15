const mongoose = require('mongoose');

var Session = mongoose.Schema({
    sid: {
        type: String
    },
    pid: {
        type: String
    },
    startTime: { 
        type: String
    },
    endTime:{
        type: String
    },
    did:{
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

module.exports = mongoose.model('Session', Session);


// sessionId
// projectId
// startTime
// endTime
// deviceId