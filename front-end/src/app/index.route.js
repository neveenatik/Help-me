export function routerConfig($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/',
      template: '<helpme-home></helpme-home>',
    })
    .state('auth', {
      url: '/auth',
      templateUrl: 'app/auth/auth.html',
      controller: 'AuthController',
      controllerAs: 'auth'
    })
    .state('profile', {
      url: '/profile',
      template: '<helpme-profile></helpme-profile>'
    });

  $urlRouterProvider.otherwise('/');
}
