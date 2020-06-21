var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jsonParser = express.json();

var uristring = 
  process.env.MONGODB_URI || 

  'mongodb://admin123:admin123@ds135335.mlab.com:35335/heroku_4pb3bb8l';

mongoose.connect(uristring, { useNewUrlParser: true }, function (err, res) {
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
	Boards.find({userName: req.body.userName}, function(err, docs){
		if(err) return console.log(err);
		res.json(docs); 
	});
	
});

router.post('/api/deleteBoard', jsonParser, async (req,res) => {
	Boards.deleteOne({_id: req.body._id}, function(err){
		if(err) return console.log(err);
		console.log("Доска удалена");
	});
});

router.post('/api/home', jsonParser, (req,res) => {
	let board = new Boards({userName: req.body.userName, name: req.body.name, tasks: req.body.tasks});
	board.save(function(err) {});
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

router.post('/api/changeBoard', jsonParser, async (req,res) => {
	Boards.deleteOne({userName: req.body.userName}, function(err){ 
		if(err) return console.log(err);
	});
	let board = new Boards({userName: req.body.userName, name: req.body.name, tasks: req.body.tasks});
	board.save(function(err) {});
});

process.on("SIGINT", () => {
	mongoose.disconnect();
	process.exit();
});

module.exports = router;