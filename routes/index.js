var express = require('express');

var Db = require('mongodb').Db,
	MongoClient = require('mongodb').MongoClient,
	Server = require('mongodb').Server,
	url = require("url");
//	ReplSetServers = require('mongodb').ReplSetServers,
//	ObjectID = require('mongodb').ObjectID,
//	Binary = require('mongodb').Binary,
//	GridStore = require('mongodb').GridStore,
//	Grid = require('mongodb').Grid,
//	Code = require('mongodb').Code,
//	BSON = require('mongodb').pure().BSON,
//	assert = require('assert');

//var uri = "mongodb://localhost:27017/";


var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	var mongoclient = new MongoClient(new Server("localhost", 27017), {native_parser: true});
	var results = [];
	mongoclient.open(function(err, mongoclient) {
		var db = mongoclient.db("mull");
		db.collection('scores').find({}).each(function(err, doc){
			if(doc){
				console.log("push");
				results.push([doc.username, doc.score]);
			} else {
				console.log("close");
				db.close();
			}
			res.render('index', { result : results });
		});

	});
});

router.get('/addScore', function(req, res) {
	var mongoclient = new MongoClient(new Server("localhost", 27017), {native_parser: true});
	var param = url.parse(req.url, true);

	if(param.query.username && param.query.score){
		var doc = {
			username: param.query.username,
			score: param.query.score
		}

		mongoclient.open(function(err, mongoclient) {
			var db = mongoclient.db("mull");
			db.collection('scores').insert(doc, {upsert:true}, function(err, result) {
				console.log("asd", result);
			});
		});
	}

	res.render('test', { title: 'TEST' });
});

router.get('/getScores', function(req, res) {
	var mongoclient = new MongoClient(new Server("localhost", 27017), {native_parser: true});

	mongoclient.open(function(err, mongoclient) {
		var db = mongoclient.db("mull");
		var results = [];
		db.collection('scores').find({}).each(function(err, doc){
			results.push([doc.username, doc.score]);
		});

	});

	res.render('test', { result : results });
});

module.exports = router;
