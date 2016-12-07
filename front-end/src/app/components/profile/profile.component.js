
export var helpmeProfile = {
  controller: HelpmeProfile,
  controllerAs: 'vm',
  templateUrl: 'app/components/profile/profile.html'
};

function HelpmeProfile($auth, $http, $state, DataModels) {
	'ngInject';

	var vm = this;
    vm.$onInit = init;

    vm.DataModels = DataModels;
    vm.editUesr = editUesr;
    vm.ratingAvg = ratingAvg;
    vm.getDayNumber = getDayNumber;
    vm.getYears = getYears;
    vm.newBirth = newBirth;

    vm.userInfo = {}
    vm.newDate = {}
    vm.rating = 5;


	function costomizeUserInfo(){
        vm.userInfo.firstName = capitalizeFirstLetter(vm.userInfo.firstName);
        vm.userInfo.lastName = capitalizeFirstLetter(vm.userInfo.lastName);
        vm.userInfo.birth = new Date(vm.userInfo.dateOfbirth);
        vm.userInfo.birth = vm.userInfo.birth.toLocaleDateString();
    }

    function ratingAvg(num){
    	return new Array(Number(num));
    }

	function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
	}

    function user() {
        var token = $auth.getToken();               // user token
        var user_id = $auth.getPayload().sub;       // user ID
        $http({
            method: 'GET',
            url: 'http://localhost:5000/api/users/' + user_id,
            headers: {
                'Authorization': token
            }
        })
        .then(function(response) {
            vm.userInfo = response.data;
            costomizeUserInfo();
            console.log(vm.userInfo)
        })
        .catch(function(error, status) {
            console.log(error);
        });
    }

    function editUesr() {
        var token = $auth.getToken();      // user token
        var user_id = $auth.getPayload().sub; //user ID
        $http({
            method: 'PUT',
            url: 'http://localhost:5000/api/users/' + user_id,
            headers: {
                'Authorization': token
            },
            data: {
                'user': vm.userInfo
            }
        })
        .then(function(response) {
            console.log("post", response);
        })
        .catch(function(error, status) {
            console.log(error);
        });
    }

    function newBirth() {
        if(!vm.newDate.year || !vm.newDate.month || !vm.newDate.day)
            return ///  Do validation here ok ?
        vm.userInfo.dateOfbirth = new Date(vm.newDate.year, vm.newDate.month, vm.newDate.day);
        editUesr();
    }

    function getDayNumber(value) {
        if(['January', 'March', 'May', 'July', 'August', 'October', 'December'].includes(value)){
            return vm.DataModels.month31;
        }
        if(['April', 'June', 'September', 'November'].includes(value)){
            return vm.DataModels.month30;
        }
        if('February'){
            return vm.DataModels.month29;
        }
    }

    function getYears(){
        var d = new Date().getFullYear();
        var years = [];
        for(var i = d-100; i < d-13; i++){
            years.unshift(i);
        }
        return years;
    }

    function init() {
        user();
        //editUesr();
    }


}
