angular.module('starter', ['ionic', 'ngCordova', 'filtros', 'controllers', 'utilitarios'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    moment.locale('pt_BR');

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('home', {
    url: '/home',
    controller: 'HomeCtrl',
    templateUrl: 'templates/home.html'
  })

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.tribos', {
    url: '/tribos',
    views: {
      'menuContent': {
        templateUrl: 'templates/tribos.html',
        controller: 'TribosCtrl'
      }
    }
  })

  .state('app.perfil', {
    url: '/perfil',
    views: {
      'menuContent': {
        templateUrl: 'templates/perfil.html',
        controller: 'PerfilCtrl'
      }
    }
  })

  .state('app.atividades', {
    url: '/atividades',
    views: {
      'menuContent': {
        templateUrl: 'templates/atividades.html',
        controller: 'AtividadesCtrl'
      }
    }
  });

  $urlRouterProvider.otherwise(function() {
    var jaPassouPelaHome = localStorage['jaPassouPelaHome'];

    if (jaPassouPelaHome)
      return '/app/tribos';

    console.log(jaPassouPelaHome);

    localStorage['jaPassouPelaHome'] = true;
    return '/home';
  });
});