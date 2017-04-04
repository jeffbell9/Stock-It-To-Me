var express = require('express');
var router = express.Router();
var fs = require('fs');

router.post('/delete', function (req, res) {
	res.end();

	var fileContents = fs.readFileSync('public/mock/tickers.json', {encoding: 'utf8'});
	var fileContentsSymbols = fs.readFileSync('public/mock/symbols.json', {encoding: 'utf8'});
	fileContents = JSON.parse(fileContents);
	fileContentsSymbols = JSON.parse(fileContentsSymbols);

	var name = req.body.company;

	for (var info in fileContents) {
		if (fileContents[info].company === name) {
			fileContents.splice(fileContents.indexOf(fileContents[info]), 1);
		}
	}

	for (var symbol in fileContentsSymbols) {
		if (fileContentsSymbols[symbol] === name) {
			fileContentsSymbols.splice(fileContentsSymbols.indexOf(fileContentsSymbols[symbol]), 1);
		}
	}

	fs.writeFileSync('public/mock/tickers.json', JSON.stringify(fileContents));
	fs.writeFileSync('public/mock/symbols.json', JSON.stringify(fileContentsSymbols));

});

router.post('/', function (req, res) {
	res.end();

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

router.post('/add', function (req, res) {
	res.end();

	var newQuote = JSON.stringify(req.body);
	var quoteJSON = req.body;
	var fileContents = fs.readFileSync('public/mock/tickers.json', {encoding: 'utf8'});
	var fileContentsSymbols = fs.readFileSync('public/mock/symbols.json', {encoding: 'utf8'});

	if (fileContents === '[]') {
		fileContents = fileContents.replace(/]$/, "");
		fileContentsSymbols = fileContentsSymbols.replace(/]$/, "");
		fs.writeFileSync('public/mock/tickers.json', fileContents + newQuote + "]");
		fs.writeFileSync('public/mock/symbols.json', fileContentsSymbols + '"' + quoteJSON.company + '"' + "]");
	} else {
		fileContents = fileContents.replace(/]$/, "");
		fileContentsSymbols = fileContentsSymbols.replace(/]$/, "");
		fs.writeFileSync('public/mock/tickers.json', fileContents + "," + newQuote + "]");
		fs.writeFileSync('public/mock/symbols.json', fileContentsSymbols + "," + '"' + quoteJSON.company + '"' + "]");
	}
});

router.post('/clear', function (req, res) {
	res.end();

	fs.writeFileSync('public/mock/tickers.json', "[" + "]");	
})


module.exports = router;