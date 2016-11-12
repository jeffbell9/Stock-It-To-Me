var express = require('express');
var router = express.Router();
var fs = require('fs');

router.post('/delete', function (req, res) {

	var fileContents = fs.readFileSync('public/mock/tickers.json', {encoding: 'utf8'});
	fileContents = JSON.parse(fileContents);
	var name = req.body.company;

	for (var info in fileContents) {
		if (fileContents[info].company === name) {
			fileContents.splice(fileContents.indexOf(fileContents[info]), 1);
		}
	}

	fs.writeFileSync('public/mock/tickers.json', JSON.stringify(fileContents));

});

router.post('/', function (req, res) {
	var newQuote = JSON.stringify(req.body);
	var fileContents = fs.readFileSync('public/mock/tickers.json', {encoding: 'utf8'});

	if (fileContents === '[]') {
		fileContents = fileContents.replace(/]$/, "");
		fs.writeFileSync('public/mock/tickers.json', fileContents + newQuote + "]");
	} else {
		fileContents = fileContents.replace(/]$/, "");
		fs.writeFileSync('public/mock/tickers.json', fileContents + "," + newQuote + "]");
	}
});


module.exports = router;