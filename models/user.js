const mongoose = require('mongoose');

var User = mongoose.Schema({
    name: {
        type: String
    },
    company: {
        type: String
    },
    mobile: {
        type: String
    },
    email: {
        type: String
    },
    address: {
        type: String
    },
    password: {
        type: String
    },
    token: {
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


module.exports = mongoose.model('Users', User);
// name
// company
// mobile
// email
// address
// password