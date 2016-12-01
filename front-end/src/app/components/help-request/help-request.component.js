
export var helpmeHelpRequest = {
  controller: HelpmeHelpRequestController,
  controllerAs: 'vm',
  templateUrl: 'app/components/help-request/help-request.html'
};

function HelpmeHelpRequestController($auth, $http, DataModels) {
	'ngInject';

	var vm = this;
    vm.$auth = $auth;
    vm.$http = $http;
    vm.DataModels = DataModels;
    vm.postHelpRequest = postHelpRequest;
    vm.getHelpRequest = getHelpRequest;
    //vm.user = user;

  function getHelpRequest(){
    //var vm = this;
    this.$http.get('http://localhost:5000/api/helpRequest').then(function (result) {
      // vm.sasa = result.data;
      console.log(result.data);
    }); 
  }

  function postHelpRequest() {
		this.$http.post('http://localhost:5000/api/helpRequest', {helprequest: this.helprequest});
	}

  // function user() {
  //     var vm = this;
  //     var user_id = vm.$auth.getPayload().sub;
  //     console.log(user_id);
  //     this.$http.get('http://localhost:5000/api/helpRequest/'+ user_id).then(function (result) {
  //     // vm.sasa = result.data;
  //     console.log(result);
  //   }); 
  // }
}
