angular.module('controllers.tribos', ['services', 'utilitarios', 'mapa'])
  .controller('TribosCtrl', function($rootScope, $scope, geolocalizacao, Atividades, Tribos, mapa) {
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

    $scope.$on('$ionicView.beforeEnter', function(event, viewData) {
      var atividadesDoUsuario = Atividades.selecionadas();

      $scope.tribos = Tribos.porAtividade(atividadesDoUsuario);
      $scope.tribosPertos = Tribos.porAtividdeComDistanciaMaxima(5);
    });

    $scope.$watch('tribos', function(tribos) {
      if (!tribos) return;

      mapa.limparMarcadores();

      tribos.map(function(tribo) {
        var nomeDoIcone = tribo.categoria.toLowerCase();
        mapa.marcar(tribo.coordenada, 'css/img/' + nomeDoIcone + '.png');
      });
    });

    mapa.criar('mapa', $rootScope.coordenada).marcarReferencia($rootScope.coordenada);
  });