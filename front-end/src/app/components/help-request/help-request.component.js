
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

    function postHelpRequest() {
		this.$http.post('http://localhost:5000/api/helpRequest', {helprequest: this.helprequest});
	}

}
