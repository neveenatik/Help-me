
export var helpmeHome = {
  controller: HelpmeHome,
  // controllerAs: 'vm',
  templateUrl: 'app/components/home/home.html'
};

function HelpmeHome($auth) {
	'ngInject';

	var vm = this;
	vm.$auth = $auth;
    vm.isAuthenticated = $auth.isAuthenticated;

}
