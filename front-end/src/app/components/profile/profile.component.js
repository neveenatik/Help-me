
export var helpmeProfile = {
  controller: HelpmeProfile,
  controllerAs: 'vm',
  templateUrl: 'app/components/profile/profile.html'
};

function HelpmeProfile($auth) {
	'ngInject';

	var vm = this;
	vm.$auth = $auth;
    vm.isAuthenticated = $auth.isAuthenticated;


}
