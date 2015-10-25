angular.module('starter.controllers', ['services', 'utilitarios', 'mapa'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
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

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [{
    title: 'Reggae',
    id: 1
  }, {
    title: 'Chill',
    id: 2
  }, {
    title: 'Dubstep',
    id: 3
  }, {
    title: 'Indie',
    id: 4
  }, {
    title: 'Rap',
    id: 5
  }, {
    title: 'Cowbell',
    id: 6
  }];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {});