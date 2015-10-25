angular.module('services', [])

.factory('Categorias', function(localStorage) {
	var dados = [{
		nome: 'Esportes'
	}, {
		nome: 'Jogos presenciais'
	}, {
		nome: 'Jogos'
	}];

	return {
		todas: function() {
			return dados;
		},

		selecionadas: function() {
			return localStorage.get('categorias');
		},

		salvar: function(categorias) {
			localStorage.set('categorias', categorias);
		}
	}
})

.factory('Atividades', function(localStorage) {
	var dados = [{
		nome: 'Patins',
		categoria: 'Esportes'
	}, {
		nome: 'Poker',
		categoria: 'Jogos presenciais'
	}, {
		nome: 'Magic',
		categoria: 'Jogos presenciais'
	}, {
		nome: 'CS:GO',
		categoria: 'Jogos'
	}];

	return {
		todas: function() {
			return dados;
		},

		porCategoria: function(categorias) {
			var atividades = [];

			categorias.map(function(categoria) {
				var atividadesDaCategoria = dados.filter(function(atividade) {
					return categoria.nome === atividade.categoria;
				});

				atividadesDaCategoria.map(function(atividade) {
					atividades.push(atividade);
				});
			});

			return atividades;
		},

		selecionadas: function() {
			return localStorage.get('atividades', dados);
		},

		salvar: function(atividades) {
			localStorage.set('atividades', atividades);
		}
	};
})

.factory('Tribos', function($rootScope, calcularDistancia) {
	var dados = JSON.parse('[{"data":1445775882016,"coordenada":{"latitude":-20.453751,"longitude":-54.572491},"populacao":15,"categoria":"Patins"},{"data":1445775882018,"coordenada":{"latitude":-20.469711,"longitude":-54.620121},"populacao":20,"categoria":"Poker"},{"data":1445775882018,"coordenada":{"latitude":-20.469711,"longitude":-54.620121},"populacao":47,"categoria":"Livros"}]');

	function tratarInformacoesCalculadas(tribos) {
		return tribos.map(function(tribo) {
			tribo.data = moment(tribo.data).format('DD/MM/YYYY HH:mm:ss');
			tribo.distancia = calcularDistancia.calcular($rootScope.coordenada, tribo.coordenada);

			return tribo;
		});
	}

	return {
		porAtividade: function(atividades) {
			var tribos = [];

			atividades.map(function(atividade) {
				var tribosDaCategoria = dados.filter(function(tribo) {
					return atividade.nome === tribo.categoria;
				});

				tribosDaCategoria.map(function(tribo) {
					tribos.push(tribo);
				});
			});

			return tratarInformacoesCalculadas(tribos);
		},

		porAtividdeComDistanciaMaxima: function(distnciaMaximaEmKilometros) {
			var tribos = tratarInformacoesCalculadas(dados);
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