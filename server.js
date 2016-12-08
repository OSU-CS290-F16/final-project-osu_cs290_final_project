//var path = require('path');
var express = require('express');
var exphbs = require('express3-handlebars');

var app = express();

// Use Handlebars as the view engine for the app.
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

var port = process.env.PORT || 3000;


app.get('/', function(req, res) {
	res.render('index', {
		title: 'Home'
	});
});

app.get('/about', function(req, res) {
	res.render('about', {
		title: 'About'
	});
});

app.get('/create', function(req, res) {
	res.render('create', {
		title: 'Create Marathon'
	});
});

app.get('/view', function(req, res) {
	res.render('view', {
		title: 'View Marathon'
	});
});

app.use('/public', express.static('public'));

var mysql      = require('mysql');
var connection = mysql.createConnection({
    host : 'mysql.cs.orst.edu',
    user : 'cs290_nichocam',
    password : '3596',
    database: 'cs290_nichocam'
});

var query_test = "SELECT * FROM Episode";
connection.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

connection.query(query_test, function(err, rows) {
	if(err) {
		console.log(err);
	}
	console.log(rows);
})





app.listen(port, function () {
  console.log("== Listening on port", port);
});