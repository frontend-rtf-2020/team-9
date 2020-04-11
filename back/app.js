const express = require("express");
const path = require('path');
const app = express();
var indexRouter = require('../back/router');

app.use(express.static(path.join(__dirname, '../front/build')));

app.use('/', indexRouter);

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on: http://localhost:" + port);
});

module.exports = app;

