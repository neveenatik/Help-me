export function NavbarDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    templateUrl: 'app/components/navbar/navbar.html',
    scope: {
        creationDate: '='
    },
    controller: NavbarController,
    controllerAs: 'vm',
    bindToController: true
  };

  return directive;
}

class NavbarController {
  constructor (moment, $auth) {
    'ngInject';

    this.$auth = $auth;
    this.isAuthenticated = $auth.isAuthenticated;
    // "this.creationDate" is available by directive option "bindToController: true"
    this.relativeDate = moment(this.creationDate).fromNow();
  }

  login() { 
    var vm = this;
    this.$auth.login(this.login.user).then(function (token) {
        vm.$auth.setToken(token);
    });
  }

  logout() {
    this.$auth.logout();
  }
}
