export var helpmeHelpRequest = {
  controller: HelpmeHelpRequestController,
  controllerAs: 'vm',
  templateUrl: 'app/components/help-request/help-request.html'
};

function HelpmeHelpRequestController($auth, $http, DataModels, $log) {
  'ngInject';

  var vm = this;
  vm.$log = $log;
  vm.$auth = $auth;
  vm.$http = $http;
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

    vm.token = vm.$auth.getToken()
    $http({
        method: 'POST',
        url: 'http://localhost:5000/api/helprequests',
        headers: {
          'Authorization': vm.token
        },
        data: {
          'helprequest': vm.helprequest
        }
    }).then(function successCallback(response) {
              $log.log(response.data);
            }, function errorCallback(response) {
                  if (response.status = 401) { // If you have set 401
                    $log.log("Some thing wrong!")
                  }
      });
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
