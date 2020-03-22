const express = require("express");
const app = express();

app.get("/", function(request, response){
	response.send("<br>РИ-370005 <br/> <br> Тема: доска задач </br> <br> 1. Кузнецов Максим(капитан) <br/> <br> 2. Огаров Дмитрий <br/> <br> 3. Пенягин Святослав <br/> <br> 4.Голубев Алексей <br/> <br> 5.Дмитрий Кувашов <br/>");
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

