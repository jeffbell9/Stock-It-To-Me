   var express = require('express');
var bodyParser = require('body-parser');
        var fs = require('fs');

var app = express();

app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static('public'));

app.get('/mock/tickers.json/:name', function (req, res) {

	var fileContents = fs.readFileSync('public/mock/tickers.json', {encoding: 'utf8'});
	fileContents = JSON.parse(fileContents);
	var name = req.params.name;

	for (var info in fileContents) {
		if (fileContents[info].company === name) {
			fileContents.splice(fileContents.indexOf(fileContents[info]), 1);
		}
	}

	fs.writeFileSync('public/mock/tickers.json', JSON.stringify(fileContents));

});

app.post('/mock/tickers.json', function (req, res) {
	var newQuote = JSON.stringify(req.body);
	var fileContents = fs.readFileSync('public/mock/tickers.json', {encoding: 'utf8'});

	fileContents = fileContents.replace(/]$/, "");
	fs.writeFileSync('public/mock/tickers.json', fileContents + "," + newQuote + "]");
});

app.listen(3000, function() {
	console.log("The server is running on port 3000!");
});