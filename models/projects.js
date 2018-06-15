const mongoose = require('mongoose');

var Project = mongoose.Schema({
    name: {
        type: String
    },
    projectToken: {
        type: String
    },
    subscid: {
        //  type: mongoose.Schema.Types.ObjectId,
        //   ref: 'Subscription' 
        type: String
    },
    pid:{
        type: String
    },
    uid:{
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

module.exports = mongoose.model('Projects', Project);



// Name
// token
// subscriptionId