angular.module('utilitarios', [])

.factory('localStorage', function() {
	return {
		set: function(key, value) {
			window.localStorage[key] = JSON.stringify(value);
		},
		get: function(key, defaultValue) {
			var valor = window.localStorage.getItem(key);

			if (valor)
				return JSON.parse(valor);

			return defaultValue;
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
		latitude: -19.933856,
		longitude: -43.938515
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