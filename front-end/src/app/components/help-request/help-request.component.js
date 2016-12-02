
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
    vm.user = user;

  function getHelpRequest(){
    var vm = this;
    this.$http.get('http://localhost:5000/api/helprequests').then(function (result) {
      //var user_id = vm.$auth.getPayload();
      console.log(result);
    }); 
  }

  function postHelpRequest() {
    var vm = this;
    // this.$http.post('http://localhost:5000/api/helprequests', {helprequest: this.helprequest})
    //   .then(function () {
    //           // vm.$auth.setToken(token);
    //           //state here
    //       }, (error, status) => console.log(error));

    vm.token = vm.$auth.getToken()
    console.log(vm.token)
    console.log(this.helprequest)
    this.$http({
      method: "POST",
      url: "http://localhost:5000/api/helprequests",
      headers: {
        Authorization: vm.token
      },
      data: {
        helprequest: this.helprequest
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
    console.log("post");
	}

  function user() {
    //   var vm = this;
    //   var user_id = vm.$auth.getPayload();
    //   console.log(vm.$auth);
    //   this.$http.get('http://localhost:5000/api/user/').then(function (result) {
    //   vm.sasa = result.data;
    //   console.log(result);
    // });
    // var vm = this;
    // vm.token = vm.$auth.getToken();      // user token
    // vm.user_id = $auth.getPayload().sub; //user ID
    // console.log(vm.user_id)
    // this.$http({
    //   method: "GET",
    //   url: "http://localhost:5000/api/user/",
    //   headers: {
    //     Authorization: vm.token
    //   }
    // })
    // .then(function(response) {
    //     // success!
    //     // redirect
    //     // response = { data { question: { question_id: 5, title: '', question: ''}}}

    //     //$state.go('questions.question',{questionId: response.data.question.question_id})
    //     //x = response
    //     console.log("post", response);
    // })
    // .catch(function(error, status) {
    //  // display error
    //     console.log(error);
    // });
    console.log("post"); 
  }

  
}
