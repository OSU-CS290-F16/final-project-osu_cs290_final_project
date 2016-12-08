var path = require('path');
var express = require('express');
//var exphbs = require('express-handlebars');

var app = express();
var port = process.env.PORT || 3000;


app.get('/', function(req, res) {
	res.send('Hello there');
});

app.use('/public', express.static('public'));

app.listen(port, function () {
  console.log("== Listening on port", port);
});