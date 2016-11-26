export class HelpRequestController {
  constructor ($http) {
    'ngInject';

    this.$http = $http;
    //this.getMessages();
  }

	postHelpRequest() {
		this.$http.post('http://localhost:5000/api/helpRequest', {req: this.helprequest});
	}

}
