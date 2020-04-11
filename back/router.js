var express = require('express');
var router = express.Router();

router.get('/api/getList', (req,res) => {
	var list = ["1. Кузнецов Максим (капитан)", "2. Огаров Дмитрий", "3. Пенягин Святослав", "4.Голубев Алексей", "5.Дмитрий Кувашов"];
	res.json(list);
	console.log('Sent list of items');
});

router.get('*', (req,res) =>{
	res.sendFile(path.join(__dirname, '../front/build/index.html'));
});

module.exports = router;