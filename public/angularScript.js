angular.module("quoteApp", [])

.controller('mainCtrl', function($scope, dataService, $http) {

	dataService.getTickers(function(response) {
		var symbols = response.data;
		$scope.tickers = [];

		$http.post('mock/symbols.json/clear')
		.then(console.log("mock/symbols.json has been emptied!"));

		for (symbol in symbols) {
			dataService.getQuote(symbols[symbol], function(data) {
				var quote = data[0].l;
				var company = data[0].t;

				var postData = {"company": company, "price": quote};

				$scope.tickers.push(postData);

				$http.post('mock/symbols.json', postData)
				.then(console.log("mock/symbols.json has been updated!"));
			});
		}
	})

	$scope.addTicker = function() {
		var ticker = document.getElementById("ticker");
		var company = ticker.value;

		dataService.getQuote(company, function(data) {
			var quote = data;

			var data = {"company": company, "price": quote[0].l};

			$scope.tickers.push(data);

			$http.post('mock/symbols.json/add', data)
			.then(console.log("mock/symbols.json has been updated!"));

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

		$http.post('mock/symbols.json/delete', nameJSON)
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