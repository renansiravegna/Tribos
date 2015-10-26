angular.module('services.categorias', ['services.api'])
	.factory('Categorias', function(TribosApi, localStorage) {
		return {
			todas: function() {
				return TribosApi.categorias();
			},

			selecionadas: function() {
				var categorias = localStorage.get('categorias') || [];
				var categoriasSelecionadas = categorias.filter(function(categoria) {
					return categoria.selecionada;
				});

				return categoriasSelecionadas;
			},

			obterPorAtividade: function(atividade, callback) {
				TribosApi.categorias().then(function(response) {
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