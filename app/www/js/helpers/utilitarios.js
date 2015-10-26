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
})

.factory('calcularDistancia', function() {
	function toRad(value) {
		return value * Math.PI / 180;
	}

	function isValidCoordinate(coordinate) {
		return typeof coordinate === "object";
	}

	function calculate(from, to) {
		if (isValidCoordinate(from) && isValidCoordinate(to)) {
			var earthRadiusInKm = 6371;
			var x = (toRad(to.longitude) - toRad(from.longitude)) *
				Math.cos((toRad(from.latitude) + toRad(to.latitude)) / 2);
			var y = (toRad(to.latitude) - toRad(from.latitude));
			return Math.sqrt(x * x + y * y) * earthRadiusInKm;
		}

		return 0;
	}

	return {
		calcular: calculate,

		calcularComTexto: function(from, to) {
			var distanceInKm = calculate(from, to);

			if (distanceInKm > 1)
				return (distanceInKm).toFixed(1) + ' kilometros';

			return (distanceInKm * 1000).toFixed(0) + ' metros';
		}
	};
});