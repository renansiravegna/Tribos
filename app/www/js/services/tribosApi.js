angular.module('services.api', [])
	.factory('TribosApi', function($http) {
		var apiUrl = 'http://tribos-1096.appspot.com/s/';

		return {
			categorias: function() {
				return $http.get(apiUrl + 'categorias/');
			},

			tribos: function() {
				return $http.get(apiUrl + 'tribos');
			}
		};
	});