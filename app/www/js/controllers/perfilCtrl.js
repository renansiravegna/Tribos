angular.module('controllers.perfil', ['services', 'utilitarios', 'mapa'])
.controller('PerfilCtrl', function($scope, $state, Categorias) {
  var categoriasSelecionadas = Categorias.selecionadas();

  $scope.categorias = Categorias.todas();

  categoriasSelecionadas.map(function(categoriaSelecionada) {
    $scope.categorias.map(function(categoria) {
      if (categoria.nome === categoriaSelecionada.nome)
        categoria.selecionada = true;
    });
  });

  $scope.salvar = function() {
    Categorias.salvar($scope.categorias);
    $state.go('app.atividades');
  };
});