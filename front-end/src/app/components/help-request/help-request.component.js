export var helpmeHelpRequest = {
  controller: HelpmeHelpRequestController,
  controllerAs: 'vm',
  templateUrl: 'app/components/help-request/help-request.html'
};

function HelpmeHelpRequestController($auth, $http, DataModels, $log, $state) {
  'ngInject';

  var vm = this;
  vm.$onInit = init;

  vm.$log = $log;
  vm.DataModels = DataModels;
  vm.postHelpRequest = postHelpRequest;
  vm.getHelpRequest = getHelpRequest;
  vm.user = user;

  function getHelpRequest() {
    var vm = this;
    vm.$http.get('http://localhost:5000/api/helprequests').then(function(result) {
      //var user_id = vm.$auth.getPayload();
      console.log(result);
    });
  }

  function postHelpRequest() {
    var token = $auth.getToken();
    $http({
        method: 'POST',
        url: 'http://localhost:5000/api/helprequests',
        headers: {
          'Authorization': token
        },
        data: {
          'helprequest': vm.helprequest
        }
    })
    .then(function(response) {
        console.log("post", response);
        $state.go('home');//redirect
    })
    .catch(function(error, status) {
     // display error
        console.log(error);
    });
  }

  function user() {
    // var token = $auth.getToken();      // user token
    // var user_id = $auth.getPayload().sub; //user ID
    // console.log(user_id)
    // console.log(token)
    $http({
      method: "GET",
      url: "http://localhost:5000/api/helprequests",
      // headers: {
      //   'Authorization': vm.token
      // }
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
    //console.log("post");
  }

  function init() {
  }


}
