var express = require('express');
//var app = require('./app.js');
const bodyParser = require("body-parser");
var router = express.Router();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const app = express();
const jsonParser = express.json();

var uristring = 
  process.env.MONGODB_URI || 
  'mongodb://localhost/HelloMongoose';

mongoose.connect(uristring, function (err, res) {
	if (err) { 
	  console.log ('ERROR connecting to: ' + uristring + '. ' + err);
	} else {
	  console.log ('Succeeded connected to: ' + uristring);
	}
  });

const userScheme = new Schema({
    login: String,
	email: String,
	password: String
}, {versionKey: false});

const boardScheme = new Schema({ 
    userName: String,
	name: String,
	tasks: Array
}, {versionKey: false});

const User = mongoose.model("User", userScheme);
const Boards = mongoose.model("Boards", boardScheme);

function controlCheckInput(login, email, callback) {
	User.findOne({login: login}).exec((err, doc) => {
		if (err) console.log(err)
		if (doc == null) {
			User.findOne({email: email}).exec((err, doc) => {
				if (err) console.log(err)
				if (doc == null) {
				callback(true)
				} else {
				callback(false)
				}
			})
		} else {
		callback(false)
		}
	})
}

router.post('/api/getBoards', jsonParser, async (req,res) => {
	//Boards.deleteMany({}, function(err, docs){});
	Boards.find({userName: req.body.userName}, function(err, docs){
		if(err) return console.log(err);
		console.log(req.body.userName);
		res.json(docs); 
	});
	
});

router.post('/api/home', jsonParser, (req,res) => {
	let board = new Boards({userName: req.body.userName, name: req.body.name, tasks: req.body.tasks});
	board.save(function(err) {});
	Boards.find({}, function(err, docs){
		if(err) return console.log(err);
		console.log(docs);
	});
});

router.get('/api/getList', (req,res) => {
	var list = ["1. Кузнецов Максим (капитан)", "2. Огаров Дмитрий", "3. Пенягин Святослав", "4.Голубев Алексей", "5.Дмитрий Кувашов"];
	res.json(list);
	console.log('Sent list of items');
});

router.post('/api/register', jsonParser, async (req,res) => {
	let user = new User ({login: req.body.login, email: req.body.email, password: req.body.password});
	controlCheckInput(user.login, user.email, function (result) {
		console.log(result);	
		if (result) {
			res.json("Вы успешно зарегистрированы");
			user.save(function(err) {
				console.log("Данные записаны");
			})
		}
		else
			res.json("Пользователь с такими данными уже зарегистрирован!");
	})
});

router.post('/api/auth', jsonParser, async (req,res) => {
	User.findOne({login: req.body.login}, function(err, user){ 
		if(err) return console.log(err);
		console.log(user);
		if (user != null)
			if (user.password == req.body.password)
			{
				res.json("Вы успешно авторизовались");
			}
			else 
				res.json("Такой пользователь не найден");
		else
			res.json("Такой пользователь не найден"); 
    });
});




process.on("SIGINT", () => {
	mongoose.disconnect();
	process.exit();
});

module.exports = router;