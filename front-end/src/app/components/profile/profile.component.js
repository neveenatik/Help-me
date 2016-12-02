
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
    vm.ratingAvg = ratingAvg;

    vm.userInfo = {
    	firstName: 'charlize',
    	lastName: 'theron',
    	gender: 'Female',
    	city: 'Amsterdam',
    	dateOfBirth: new Date(1954, 2, 2),
    }

    vm.now = new Date().getFullYear();
    //vm.birthDate = vm.userInfo.dateOfBirth.getUTCFullYear(); 			//this gives just the year

	vm.dateOfBirth = vm.userInfo.dateOfBirth.toLocaleDateString();		//convert from UTC to string as dd/mm/yyy	
	vm.firstName = capitalizeFirstLetter(vm.userInfo.firstName);
	vm.lastName = capitalizeFirstLetter(vm.userInfo.firstName);
	vm.rating = 2;

	

    function ratingAvg(num){
    	return new Array(Number(num));
    }

	function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
	}





}
