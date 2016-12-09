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

var selection = [];

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
			var plot = [];
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

app.get('/view/:character', function (req, res) {
    var character = req.params.character
    console.log(char_start + character + char_end)
    connection.query(char_start + req.params.character + char_end, function (err, rows) {
        if (err) {
            console.log("--error retrieving character list from database");
            res.status(500).send("Error fetching characters from database: " + err);
        }
        else {
            var episode = [];
            var ep_title = [];
            var len = [];
            console.log(rows);

            rows.forEach(function (row) {
                episode.push({
                    episode: row.Season_and_Episode
                });
                ep_title.push({
                    ep_title: row.Episode_Title
                });
                len.push({
                        len: row.length
                });
            });

            res.render('view', {
                title: 'View Marathon',
                episode: episode,
                ep_title: ep_title,
                len: len
            });
        }
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
var char_start = "SELECT DISTINCT E.Season_and_Episode, E.Episode_Title, E.length FROM Episode AS E, Plot_Participant AS PP WHERE E.Episode_Title = PP.Episode_Title AND PP.Character_name = \'"
var char_end = "\' ORDER BY E.Airdate, E.Season_and_Episode"


app.listen(port, function () {
  console.log("== Listening on port", port);
});