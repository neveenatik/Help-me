export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main'
    })
    .state('auth/login', {
      url: '/auth/login',
      templateUrl: 'app/auth/login.html',
      controller: 'AuthController',
      controllerAs: 'auth'
    })
    .state('auth/signup', {
      url: '/auth/signup',
      templateUrl: 'app/auth/signup.html',
      controller: 'AuthController',
      controllerAs: 'auth'
    });

  $urlRouterProvider.otherwise('/');
}
