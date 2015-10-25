angular.module('controllers.perfil', ['services', 'utilitarios', 'mapa'])
  .controller('PerfilCtrl', function($scope, $state, Categorias, Atividades, $ionicHistory) {
    var categoriasSelecionadas = Categorias.selecionadas();

    $scope.teste = function() {
      console.log(arguments);
    };

    Categorias.todas().then(function(resposta) {
      $scope.categorias = resposta.data;

      categoriasSelecionadas.map(function(categoriaSelecionada) {
        $scope.categorias.map(function(categoria) {
          if (categoria.nome === categoriaSelecionada.nome)
            categoria.selecionada = true;
        });
      });
    });

    $scope.salvar = function() {
      Categorias.salvar($scope.categorias);

      var haAlgumaSelecionada = Categorias.selecionadas().length > 0;

      if (haAlgumaSelecionada)
        $state.go('app.atividades');
      else {
        $ionicHistory.nextViewOptions({
          disableBack: true
        });

        Atividades.salvar(null);
        $state.go('app.tribos');
      }
    };
  });