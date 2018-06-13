const mongoose = require('mongoose');

var Project = mongoose.Schema({
    name: {
        type: String
    },
    projectToken: {
        type: String
    },
    subscriptionId: {
         type: mongoose.Schema.Types.ObjectId,
          ref: 'Subscription' 
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

module.exports = mongoose.model('Projects', Project);



// Name
// token
// subscriptionId