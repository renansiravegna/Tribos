angular.module('starter.controllers', ['services', 'utilitarios', 'mapa'])

.controller('AppCtrl', function($scope) {
})

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

.controller('PerfilCtrl', function($scope) {
});