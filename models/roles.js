const mongoose = require('mongoose');

var Role = mongoose.Schema({
    name: {
        type: String
    },
    description: {
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

module.exports = mongoose.model('Role', Role);