const mongoose = require('mongoose');

var Subscription = mongoose.Schema({
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    projectId: {
         type: mongoose.Schema.Types.ObjectId,
          ref: 'projects' 
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
module.exports = mongoose.model('Subscription', Subscription);