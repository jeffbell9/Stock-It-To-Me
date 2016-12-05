angular.module("quoteApp", [])

.controller('mainCtrl', function($scope, dataService, $http) {

	dataService.getTickers(function(response) {
		$scope.tickers = response.data;
	})

	$scope.addTicker = function() {
		var ticker = document.getElementById("ticker");
		var company = ticker.value;

		dataService.getQuote(company, function(data) {
			var quote = data;

			var data = {"company": company, "price": quote[0].l};

			$scope.tickers.push(data);

			$http.post('/mock/tickers.json', data)
			.then(console.log("mock/tickers.json has been updated!"));

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

		$http.post('/mock/tickers.json/delete', nameJSON)
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
		$http.get('mock/tickers.json')
		.then(callback);
	}

});