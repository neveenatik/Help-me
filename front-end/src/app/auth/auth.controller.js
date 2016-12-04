export class AuthController {

	constructor($auth, $state, DataModels, $http) {
		'ngInject';

		this.$http = $http
		this.$auth = $auth;
		this.$state = $state;
		this.DataModels = DataModels;
		this.user = {};
		this.date = {
			year: '',
			month: '',
			day: ''
		};

	}

    register() {
		var vm = this;
		this.user.dateOfbirth = new Date(this.date.year, this.date.month, this.date.day);
        this.$http.post('http://localhost:5000/auth/signup', {user: this.user}).then(function (token) {
            vm.$auth.setToken(token);
            vm.$state.go('home');
        }, (error, status) => console.log(error));
        console.log("post", this.user);
    }
    
    login() {
        var vm = this;
        console.log(this.login.user);
        this.$http.post('http://localhost:5000/auth/login', {login: this.login.user})
        .then(function (token) {
            vm.$auth.setToken(token);
            $state.go('home');
        }).catch(
        // Log the rejection error
        function(error) {
            console.log('Handle rejected promise (', error.data.message ,') here.');
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