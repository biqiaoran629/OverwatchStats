var mongoose = require('mongoose');

// Heroes Schema

var heroesSchema = mongoose.Schema({
    Character: {
        type: String,
        required: true
    },
    Type: {
        type: String,
        required: true
    }
});


var Heroes = module.exports = mongoose.model('Heroes', heroesSchema, 'heroes');


// Get Competitive

module.exports.getHeroes = function(callback, limit) {
    Heroes.find(callback).sort({Type: -1}).limit(limit);
}
