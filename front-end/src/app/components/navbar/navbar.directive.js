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
  constructor(moment, $auth, $state) {
    'ngInject';

    var vm = this;

    this.$auth = $auth;
    this.$state = $state;
    this.isAuthenticated = $auth.isAuthenticated;
    // "this.creationDate" is available by directive option "bindToController: true"
    this.relativeDate = moment(this.creationDate).fromNow();

    vm.validation = {
      message: ""
    };
  }

  login() {
    var vm = this;
    console.log(this.login.user);
    this.$auth.login({ login: this.login.user }).then(function(token) {
      vm.$auth.setToken(token);
      vm.validation.message = "";
      vm.$state.go('home');
    }).catch(
      // Log the rejection reason
      function(error) {
        vm.validation.message = error.data.message;
      });
  }

  logout() {
    this.$auth.logout();
  }
}
