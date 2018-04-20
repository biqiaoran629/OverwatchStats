var mongoose = require('mongoose');

// Competitive Schema

var quickplaySchema = mongoose.Schema({
    Date: {
        type: String,
    },
    Map: {
        type: String,
        required: true
    },
    Character: {
        type: String,
        required: true
    },
    Result: {
        type: String,
        required: true
    },
    Mode: {
        type: String,
        required: true
    }
});


var Quickplay = module.exports = mongoose.model('Quickplay', quickplaySchema, 'quickplay');


// Get Competitive

module.exports.getQuickplay = function(callback, limit) {
    Quickplay.find(callback).limit(limit);
}

module.exports.addQuickplay = function(quickplay, callback) {
    Quickplay.create(quickplay, callback);
}