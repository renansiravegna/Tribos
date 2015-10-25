angular.module('services', [])

.factory('Categorias', function($http, localStorage) {
	return {
		todas: function(callback) {
			return $http.get('http://tribos-1096.appspot.com/s/categorias/', function() {
				if (callback)
					callback.apply(this, [arguments]);
			});
		},

		selecionadas: function() {
			var categorias = localStorage.get('categorias') || [];
			var categoriasSelecionadas = categorias.filter(function(categoria) {
				return categoria.selecionada;
			});

			return categoriasSelecionadas;
		},

		obterPorAtividade: function(atividade, callback) {
			$http.get('http://tribos-1096.appspot.com/s/categorias/').then(function(response) {
				var categorias = response.data;
				var categoriaFiltradas = categorias.filter(function(categoria) {
					return categoria.atividades.indexOf(atividade) > -1;
				})[0];

				callback.apply(this, [categoriaFiltradas]);
			});
		},

		salvar: function(categorias) {
			localStorage.set('categorias', categorias);
		}
	}
})

.factory('Atividades', function(localStorage) {
	var dados = [{
		nome: 'Patins',
		categoria: 'Esporte'
	}, {
		nome: 'Poker',
		categoria: 'Jogos presenciais'
	}, {
		nome: 'Magic',
		categoria: 'Jogos presenciais'
	}, {
		nome: 'CS:GO',
		categoria: 'Jogos'
	}, {
		nome: 'Teatro',
		categoria: 'Cultura'
	}];

	return {
		todas: function() {
			return dados;
		},

		porCategoria: function(categorias) {
			var atividades = [];

			categorias.map(function(categoria) {
				categoria.atividades.map(function(atividade) {
					atividades.push({ nome: atividade });
				});
			});

			return atividades;
		},

		selecionadas: function() {
			var atividades = localStorage.get('atividades') || [];

			return atividades.filter(function(atividade) {
				return atividade.selecionada;
			});
		},

		salvar: function(atividades) {
			localStorage.set('atividades', atividades);
		}
	};
})

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
			return $http.get('http://tribos-1096.appspot.com/s/categorias/', function(dados2) {
				return dados2;
			});
		},

		porAtividade: function(atividades) {
			var tribos = [];

			if (atividades.length === 0)
				return dados;

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

		porAtividdeComDistanciaMaxima: function(atividades, distnciaMaximaEmKilometros) {
			var tribos = this.porAtividade(atividades);
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