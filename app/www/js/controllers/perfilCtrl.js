angular.module('controllers.perfil', ['services', 'utilitarios', 'mapa'])
  .controller('PerfilCtrl', function($scope, $state, Categorias) {
    var categoriasSelecionadas = Categorias.selecionadas();

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
      $state.go('app.atividades');
    };
  });