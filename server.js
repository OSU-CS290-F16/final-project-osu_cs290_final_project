//var path = require('path');
var express = require('express');
var exphbs = require('express3-handlebars');
var bodyParser = require('body-parser');

var app = express();

// Use Handlebars as the view engine for the app.
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());

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
	connection.query(char_query, function(err, rows) {
		if(err) {
			console.log("--error retrieving character list from database");
			res.status(500).send("Error fetching characters from database: " + err);
		} 
		else {
			var chars = [];
			console.log(rows);

			rows.forEach(function (row) {
		        chars.push({
		          name: row.Character_name
		        });
	      	});

	      	res.render('create', {
				title: 'Create Marathon',
				chars: chars
			});	

		}
	});
		
});

app.get('/view', function(req, res) {
	res.render('view', {
		title: 'View Marathon'
	});
});


app.use('/public', express.static('public'));
//app.use(express.static(path.join(__dirname, '/public')));

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

var char_query = "SELECT Character_name FROM CT";
var plot_query = "SELECT type FROM Plot_Type";



app.listen(port, function () {
  console.log("== Listening on port", port);
});