export class HelpRequestController {
  constructor ($http, DataModels) {
    'ngInject';

    this.$http = $http;
    this.DataModels = DataModels;
  }

	postHelpRequest() {
		this.$http.post('http://localhost:5000/api/helpRequest', {helprequest: this.helprequest});
	}

}
