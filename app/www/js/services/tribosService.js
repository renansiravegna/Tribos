angular.module('services.tribos', ['services.api'])
	.factory('Tribos', function($rootScope, TribosApi, calcularDistancia) {
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
				return TribosApi.categorias();
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
				return TribosApi.tribos();
			},

			porAtividdeComDistanciaMaxima: function(tribos, distnciaMaximaEmKilometros) {
				var tribosDentroDaDistancia = tribos.filter(function(tribo) {
					return tribo.distancia <= distnciaMaximaEmKilometros
				});

				return tribosDentroDaDistancia;
			}
		}
	});