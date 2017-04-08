angular.module("quoteApp", [])

.controller('mainCtrl', function($scope, dataService, $http, $q) {

	dataService.getTickers(function(response) {
		var symbols = response.data;
		$scope.tickers = [];

		$http.post('mock/tickers.json/clear')
		.then(console.log("mock/tickers.json has been emptied!"));

		var currentQuotes = symbols.map(function(symbol) {
			return $http.jsonp('https://www.google.com/finance/info?q=NSE:' + symbol + '&callback=JSON_CALLBACK');
		});

		$q.all(currentQuotes).then(function(quotesArr) {
			for (var item in quotesArr) {
				var info = quotesArr[item].data;
				var quote = info[0].l;
				var company = info[0].t;

				var postData = {"company": company, "price": quote};

				$scope.tickers.push(postData);

				$http.post('mock/tickers.json', postData)
				.then(console.log("mock/tickers.json has been updated!"));
			}
		});
	})

	$scope.addTicker = function() {
		var ticker = document.getElementById("ticker");
		var company = ticker.value;

		dataService.getQuote(company, function(data) {
			var quote = data;

			var data = {"company": company, "price": quote[0].l};

			$scope.tickers.push(data);

			$http.post('mock/tickers.json/add', data)
			.then(console.log("ticker has been added!"));

		});

		ticker.value = "";

	}

	$scope.removeTicker = function() {
		var ticker = document.getElementById("ticker");
		var name = ticker.value;
		var nameJSON = {
							"company": name
						};
		
		for (var t in $scope.tickers) {
			if ($scope.tickers[t].company === name) {
				$scope.tickers.splice($scope.tickers.indexOf($scope.tickers[t]), 1);
			}

		}

		$http.post('mock/tickers.json/delete', nameJSON)
		.then(console.log("ticker has been removed!"));

		ticker.value = "";
	}

})

.service('dataService', function($http) {

	this.getQuote = function(ticker, callback) {
		$http.jsonp('https://www.google.com/finance/info?q=NSE:' + ticker + '&callback=JSON_CALLBACK')
		.success(callback);
	}

	this.getTickers = function(callback) {
		$http.get('mock/symbols.json')
		.then(callback);
	}

});