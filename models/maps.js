var mongoose = require('mongoose');

// Maps Schema

var mapsSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Type: {
        type: String,
        required: true
    }
});


var Maps = module.exports = mongoose.model('Maps', mapsSchema, 'maps');


// Get Competitive

module.exports.getMaps = function(callback, limit) {
    Maps.find(callback).sort({Type: -1}).limit(limit);
}
