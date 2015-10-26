angular.module('controllers.atividades', ['services', 'utilitarios', 'mapa'])
	.controller('AtividadesCtrl', function($scope, $state, Categorias, Atividades, $ionicHistory) {
		var categoriasSelecionadas = Categorias.selecionadas();
		var atividadesSelecionadas = Atividades.selecionadas();

		$scope.atividades = Atividades.porCategoria(categoriasSelecionadas);

		atividadesSelecionadas.map(function(atividadesSelecionada) {
			$scope.atividades.map(function(atividade) {
				if (atividade.nome === atividadesSelecionada.nome)
					atividade.selecionada = true;
			});
		});

		$scope.salvar = function() {
			Atividades.salvar($scope.atividades);

			$ionicHistory.nextViewOptions({
				disableBack: true
			});

			$state.go('app.tribos');
		}
	});