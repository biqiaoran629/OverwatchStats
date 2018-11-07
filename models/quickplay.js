var mongoose = require("mongoose");

// Competitive Schema

var quickplaySchema = mongoose.Schema({
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
  Mode: {
    type: String,
    required: true
  }
});

var Quickplay = (module.exports = mongoose.model(
  "Quickplay",
  quickplaySchema,
  "quickplay"
));

// Get Competitive

module.exports.getQuickplay = function(callback, limit) {
  Quickplay.find(callback).limit(limit);
};

module.exports.addQuickplay = function(quickplay, callback) {
  Quickplay.create(quickplay, callback);
};

module.exports.updateQuickplay = function(id, quickplay, options, callback) {
  var query = { _id: id };
  Quickplay.findOneAndUpdate(query, quickplay, options, callback);
};

module.exports.findStats = function(name, callback) {
  Quickplay.aggregate([
    { $match: { Character: name } },
    { $group: { _id: { Map: "$Map", Result: "$Result" }, total: { $sum: 1 } } },
    {
      $lookup: {
        from: "maps",
        localField: "_id.Map",
        foreignField: "Name",
        as: "quickplay_map"
      }
    },
    { $unwind: "$quickplay_map" },
    { $sort: { "_id.Map": 1 } }
  ]).exec(callback);
};

module.exports.findStatsTotal = function(callback) {
  Quickplay.aggregate([
    { $group: { _id: { Map: "$Map", Result: "$Result" }, total: { $sum: 1 } } },
    {
      $lookup: {
        from: "maps",
        localField: "_id.Map",
        foreignField: "Name",
        as: "quickplay_map"
      }
    },
    { $unwind: "$quickplay_map" },
    { $sort: { "_id.Map": 1 } }
  ]).exec(callback);
};
