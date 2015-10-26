angular.module('services.tribos', [])
	.factory('Tribos', function($rootScope, $http, calcularDistancia) {
		var dados = JSON.parse('[{"data":1445775882016,"coordenada":{"latitude":-20.453751,"longitude":-54.572491},"populacao":15,"categoria":"CS:GO","atividade":"Patins"},{"data":1445775882018,"coordenada":{"latitude":-20.469711,"longitude":-54.620121},"populacao":20,"categoria":"Destiny","atividade":"Patins"},{"data":1445775882018,"coordenada":{"latitude":-20.469711,"longitude":-54.620121},"populacao":47,"categoria":"Patins","atividade":"Patins"}]');

		function tratarInformacoesCalculadas(tribos) {
			return tribos.map(function(tribo) {
				tribo.dataFormatada = moment(tribo.data).format('DD/MM/YYYY HH:mm:ss');
				tribo.distancia = calcularDistancia.calcular($rootScope.coordenada, tribo.coordenada);

				return tribo;
			});
		}

		return {
			todas: function() {
				return $http.get('http://tribos-1096.appspot.com/s/categorias/');
			},

			porAtividade: function(atividades, tribosEnviadas) {
				var tribos = [];

				if (atividades.length === 0)
					return tratarInformacoesCalculadas(tribosEnviadas);

				atividades.map(function(atividade) {
					var tribosDaCategoria = tribosEnviadas.filter(function(tribo) {
						return atividade.nome === tribo.atividade;
					});

					tribosDaCategoria.map(function(tribo) {
						tribos.push(tribo);
					});
				});

				return tratarInformacoesCalculadas(tribos);
			},

			todasNaApi: function() {
				return $http.get('http://tribos-1096.appspot.com/s/tribos');
			},

			porAtividdeComDistanciaMaxima: function(tribos, atividades, distnciaMaximaEmKilometros) {

				var tribosDentroDaDistancia = tribos.filter(function(tribo) {
					return tribo.distancia <= distnciaMaximaEmKilometros
				});

				return tribosDentroDaDistancia;
			}
		}
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