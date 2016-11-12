var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./routes');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static('public'));

app.use('/mock/tickers.json', routes);

app.listen(3000, function() {
	console.log("The server is running on port 3000!");
});