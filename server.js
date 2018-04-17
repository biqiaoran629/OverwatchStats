var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors')
var mongoose = require('mongoose');

app.use(bodyParser.json());

Competitive = require('./models/competitive');

Heroes = require('./models/heroes');

Maps = require('./models/maps');

// Connect to mongoose

mongoose.connect('mongodb://localhost/overwatchstats');

var db = mongoose.connection;

app.use(cors());

app.get('/', function(req, res){
	res.send('Hello World!');
});

//Get competitive records

app.get('/competitive', function(req, res){
	Competitive.getCompetitive(function(err, competitiveRecords){
		if (err) {
			throw err;
		}
		res.json(competitiveRecords);
	})
});

app.get('/heroes', function(req, res){
    Heroes.getHeroes(function(err, heroes){
        if (err) {
            throw err;
        }
        res.json(heroes);
    })
});

app.get('/maps', function(req, res){
    Maps.getMaps(function(err, maps){
        if (err) {
            throw err;
        }
        res.json(maps);
    })
});

//Add competitive records

app.post('/competitive', function(req, res){
	var competitive = req.body;
    Competitive.addCompetitive(competitive, function(err, competitive){
        if (err) {
            throw err;
        }
        res.json(competitive);
    })
});


app.listen(3001);

console.log('Running on port 3001...');