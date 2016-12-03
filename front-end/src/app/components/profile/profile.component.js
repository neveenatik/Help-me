
export var helpmeProfile = {
  controller: HelpmeProfile,
  controllerAs: 'vm',
  templateUrl: 'app/components/profile/profile.html'
};

function HelpmeProfile($auth, $http, $state) {
	'ngInject';

	var vm = this;
    vm.$onInit = init;

    vm.isAuthenticated = $auth.isAuthenticated;
    vm.ratingAvg = ratingAvg;
    vm.rating = 5;
    vm.userInfo = {}


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
        })
        .then(function(response) {
            // success!
            // redirect
            // response = { data { question: { question_id: 5, title: '', question: ''}}}
            //$state.go('questions.question',{questionId: response.data.question.question_id})
            //x = response
            vm.userInfo = response.data;
            costomizeUserInfo();
        })
        .catch(function(error, status) {
         // display error
            console.log(error);
        });
    }

    function editUesr() {
        vm.userInfo.lastName = 'theron';
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
            // success!
            // redirect
            // response = { data { question: { question_id: 5, title: '', question: ''}}}
            //$state.go('questions.question',{questionId: response.data.question.question_id})
            //x = response
            console.log("post", response);
        })
        .catch(function(error, status) {
         // display error
            console.log(error);
        });
    }

    function init() {
        user();
        //editUesr();
    }


}
