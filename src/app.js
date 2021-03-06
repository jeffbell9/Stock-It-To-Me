var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./routes');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', express.static('public'));

app.use('/mock/tickers.json', routes);

app.listen(port, function() {
	console.log("The server is running on port " + port + "!");
});