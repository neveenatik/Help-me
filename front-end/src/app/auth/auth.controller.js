export class AuthController {

	constructor($auth, DataModels, $location) {
		'ngInject';

		this.$auth = $auth;
		this.$location = $location;
		this.DataModels = DataModels;
		this.isAuthenticated = $auth.isAuthenticated;
	}

	register() {
		var vm = this;
		this.$auth.signup(this.user).then(function(token) {
			vm.$auth.setToken(token);
			vm.$location.path('/');
		});
	}

	login() {
		var vm = this;
		this.$auth.login(this.user).then(function(token) {
			vm.$auth.setToken(token);
			vm.$location.path('/');
		});
	}

	getDayNumber(value) {
		if(['January', 'March', 'May', 'July', 'August', 'October', 'December'].includes(value)){
			 return this.DataModels.month31;
		}
		if(['April', 'June', 'September', 'November'].includes(value)){
			return this.DataModels.month30;
		}
		if('February'){
			return this.DataModels.month29;
		}
	}

	getYears(){
		var d = new Date().getFullYear();
		var years = [];
		for(var i = d-100; i < d-13; i++){
			years.unshift(i);
		}
		return years;
	}

}