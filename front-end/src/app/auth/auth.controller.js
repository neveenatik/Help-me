export class AuthController {

	constructor($auth, DataModels) {
		'ngInject';

		this.$auth = $auth;
		this.DataModels = DataModels;
	}

    register() {
        var vm = this;
        this.$auth.signup(this.user).then(function (token) {
            vm.$auth.setToken(token);
        }, (error, status) => console.log(error.data.message));
    }
    
    login() {
        var vm = this;
        this.$auth.login(this.login.user).then(function (token) {
            vm.$auth.setToken(token);
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