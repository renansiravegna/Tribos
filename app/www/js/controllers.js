angular.module('starter.controllers', ['services', 'utilitarios', 'mapa'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {})

.controller('TribosCtrl', function($rootScope, $scope, geolocalizacao, Tribos, mapa) {
  $scope.buscar = function() {
    var termoDaBusca = $scope.termoDaBusca.toUpperCase();
    var tribosEncontradas = Tribos.todas().filter(function(tribo) {
      return tribo.categoria.toUpperCase().indexOf(termoDaBusca) > -1;
    });

    $scope.tribos = tribosEncontradas;
  };

  $rootScope.$watch('coordenada', function(coordenada) {
    mapa.alterarReferencia(coordenada);
  });

  $scope.tribos = Tribos.todas();
  $scope.tribosPertos = Tribos.porDistanciaMaxima(5);

  $scope.$watch('tribos', function(tribos) {
    tribos.map(function(tribo) {
      var nomeDoIcone = tribo.categoria.toLowerCase();
      mapa.marcar(tribo.coordenada, 'css/img/' + nomeDoIcone + '.png');
    });
  });

  mapa.criar('mapa', $rootScope.coordenada).marcarReferencia($rootScope.coordenada);
})

.controller('PerfilCtrl', function($scope, $state, Categorias) {
  $scope.categorias = Categorias.todas();

  $scope.salvar = function() {
    var categoriasSelecionadas = $scope.categorias.filter(function(categoria) {
      return categoria.selecionada;
    });

    Categorias.salvar(categoriasSelecionadas);
    $state.go('app.atividades');
  };
})

.controller('AtividadesCtrl', function($scope, $state, Categorias, Atividades) {
  var categoriasSelecionadas = Categorias.selecionadas();
  $scope.atividades = Atividades.porCategoria(categoriasSelecionadas);

  $scope.salvar = function() {
    $state.go('app.tribos');
  }
});