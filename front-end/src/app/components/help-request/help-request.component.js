export var helpmeHelpRequest = {
  controller: HelpmeHelpRequestController,
  controllerAs: 'vm',
  templateUrl: 'app/components/help-request/help-request.html'
};

function HelpmeHelpRequestController($auth, $http, DataModels, $log, $state) {
  'ngInject';

  var vm = this;
  vm.$log = $log;
  vm.DataModels = DataModels;
  vm.postHelpRequest = postHelpRequest;

  function postHelpRequest() {
    var token = $auth.getToken();
    // validation fucntino on vm.helprequest 
    var categoryToCheck = vm.helprequest.category;
    if (categoryToCheck == undefined) {
      return alert("Please choose a category!");
    };
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
        //$state.go('home'); //redirect
      })
      .catch(function(error, status) {
        // display error
        console.log(error);
      });
  }
  

}
