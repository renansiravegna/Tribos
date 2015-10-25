angular.module('utilitarios', [])

.factory('localStorage', function() {
	return {
		set: function(key, value) {
			window.localStorage[key] = JSON.stringify(value);
		},
		get: function(key, defaultValue) {
			var valor = window.localStorage[key];
			return JSON.parse(valor || defaultValue);
		},
		setObject: function(key, value) {
			window.localStorage[key] = JSON.stringify(value);
		},
		getObject: function(key) {
			return JSON.parse(window.localStorage[key] || '{}');
		}
	}
})

.factory('geolocalizacao', function($rootScope, $cordovaGeolocation) {
	$rootScope.coordenada = {
		latitude: -20.497409,
		longitude: -54.627691
	};

	var self = {
		monitorar: function(aposIniciar) {
			var atualizarLocalizacao = function(geoposicao) {
				$rootScope.coordenada = geoposicao.coords;
			};

			var ocorreuErro = function(erro) {
				var geolocalizacaoNaoAutorizada = 1;
				var timeoutAoObterGeolocalizacao = 3;

				console.log('Erro ao obter localização: ' + err.code + ' - ' + err.message);
			};

			var opcoes = {
				timeout: 10000,
				enableHighAccuracy: true
			};

			$cordovaGeolocation
				.watchPosition(opcoes)
				.then(null, ocorreuErro, atualizarLocalizacao);
		}
	};

	return self;
});