export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main'
    })
    .state('auth', {
      url: '/auth',
      templateUrl: 'app/auth/auth.html',
      controller: 'AuthController',
      controllerAs: 'auth'
    }).state('helpRequest', {
      url: '/helpRequest',
      template: '<helpme-help-request></helpme-help-request>',

      // templateUrl: 'app/helprequest/helprequest.html',
      // controller: 'HelpRequestController',
      // controllerAs: 'vm'
    });

  $urlRouterProvider.otherwise('/');
}
