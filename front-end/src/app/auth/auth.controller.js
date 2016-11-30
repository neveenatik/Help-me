export class AuthController {

	constructor($auth, $state, DataModels, $http) {
		'ngInject';

		this.$http = $http
		this.$auth = $auth;
		this.DataModels = DataModels;

	}

    register() {
     /*   var vm = this;
        this.$auth.signup(this.user).then(function (token) {
            vm.$auth.setToken(token);
            //state here
        }, (error, status) => console.log(error.data.message));
       	*/
		
		var vm = this;
        this.$http.post('http://localhost:5000/auth/signup', {user: this.user}).then(function (token) {
            vm.$auth.setToken(token);
            //state here
        }, (error, status) => console.log(error));
        console.log("post");
    }
    
    // login() {
    //     var vm = this;
    //     this.$auth.login(this.login.user).then(function (token) {
    //         vm.$auth.setToken(token);
    //         //state here
    //     }).catch(
    //     // Log the rejection error
    //     function(error) {
    //         console.log('Handle rejected promise (', error.data.message ,') here.');
    //     });
    // }    
    login() {
        var vm = this;
        console.log(this.login.user);
        this.$http.post('http://localhost:5000/auth/login', {login: this.login.user})
        .then(function (token) {
            vm.$auth.setToken(token);
            //state here
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