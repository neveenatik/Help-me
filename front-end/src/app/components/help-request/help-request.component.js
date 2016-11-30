
export var helpmeHelpRequest = {
  controller: HelpmeHelpRequestController,
  controllerAs: 'vm',
  templateUrl: 'app/components/help-request/help-request.html'
};

function HelpmeHelpRequestController($http, DataModels) {
	'ngInject';

	var vm = this;
    vm.$http = $http;
    vm.DataModels = DataModels;
    vm.postHelpRequest = postHelpRequest;
    vm.getHelpRequest = getHelpRequest;

  function getHelpRequest(){
    //var vm = this;
    this.$http.get('http://localhost:5000/api/helpRequests').then(function (result) {
      // vm.sasa = result.data;
      console.log(result.data);
    }); 
  }

  function postHelpRequest() {
		this.$http.post('http://localhost:5000/api/helpRequests', {helprequest: this.helprequest});
	}

}
