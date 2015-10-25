angular.module('controllers.tribos', ['services', 'utilitarios', 'mapa'])
  .controller('TribosCtrl', function($rootScope, $scope, geolocalizacao, Atividades, Tribos, Categorias, mapa) {
    var memoriaDeTribos = new MemoriaDeTribos();

    $scope.buscar = function() {
      var termoDaBusca = $scope.termoDaBusca.toUpperCase();

      memoriaDeTribos.restaurar($scope);

      if (termoDaBusca === "")
        return;

      var tribosEncontradas = $scope.tribos.filter(function(tribo) {
        return tribo.nome.toUpperCase().indexOf(termoDaBusca) > -1;
      });

      $scope.tribos = tribosEncontradas;
      $scope.tribosPertos = tribosEncontradas;
    };

    $rootScope.$watch('coordenada', function(coordenada) {
      mapa.alterarReferencia(coordenada);
    });

    $scope.$on('$ionicView.beforeEnter', function() {
      var atividadesDoUsuario = Atividades.selecionadas();

      Tribos.todasNaApi().then(function(response) {
        var tribos = response.data;


        $scope.tribos = Tribos.porAtividade(atividadesDoUsuario, tribos);
        $scope.tribosPertos = Tribos.porAtividdeComDistanciaMaxima($scope.tribos, null, 5);
        memoriaDeTribos.salvar($scope);
      });
    });

    $scope.$watch('tribos', function(tribos) {
      if (!tribos) return;

      mapa.limparMarcadores();

      tribos.map(function(tribo) {
        Categorias.obterPorAtividade(tribo.atividade, function(categoria) {

          var nomeDoIcone = categoria.nome === "Jogos" ? 'Jogos' : tribo.atividade.replace('ç', 'c').replace('ã', 'a');
          mapa.marcar(tribo.coordenada, 'css/img/' + nomeDoIcone.toLowerCase() + '.png');
        });
      });
    });

    mapa.criar('mapa', $rootScope.coordenada).marcarReferencia($rootScope.coordenada);
  });