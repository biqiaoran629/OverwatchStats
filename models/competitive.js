var mongoose = require("mongoose");

// Competitive Schema

var competitiveSchema = mongoose.Schema({
  Date: {
    type: String
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
  Season: {
    type: Number,
    required: true
  },
  Reason: {
    type: String
  },
  Rank: {
    type: String
  },
  SR: {
    type: Number
  },
  Diff: {
    type: Number
  }
});

var Competitive = (module.exports = mongoose.model(
  "Competitive",
  competitiveSchema,
  "competitive"
));

// Get Competitive

module.exports.getCompetitive = function(callback, limit) {
  Competitive.find(callback).limit(limit);
};

module.exports.addCompetitive = function(competitive, callback) {
  Competitive.create(competitive, callback);
};

module.exports.updateCompetitive = function(
  id,
  competitive,
  options,
  callback
) {
  var query = { _id: id };
  Competitive.findOneAndUpdate(query, competitive, options, callback);
};
