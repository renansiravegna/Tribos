angular.module('services.categorias', [])
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
	});