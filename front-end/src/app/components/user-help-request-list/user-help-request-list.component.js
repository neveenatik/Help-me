export var helpmeUserHelpRequestList = {
  controller: HelpmeUserHelpRequestListController,
  controllerAs: 'vm',
  templateUrl: 'app/components/user-help-request-list/user-help-request-list.html'
};

function HelpmeUserHelpRequestListController($auth, $http, $log, $state) {
  'ngInject';

  var vm = this;
  vm.$onInit = init;
  vm.$log = $log;
  vm.editHelpRequest = editHelpRequest;

  vm.list = [];

  function userList() {
    var token = $auth.getToken();
    var user_id = $auth.getPayload().sub
    $http({
        method: 'GET',
        url: 'http://localhost:5000/api/helprequests/user/' + user_id,
        headers: {
          'Authorization': token
        }
      })
      .then(function(response) {
        vm.list = response.data;
        modifyList();
        console.log(vm.list)
      })
      .catch(function(error, status) {
        console.log(error);
      });
  }

  function modifyList() {
    for (var i = 0; i < vm.list.length; i++) {
      vm.list[i].created = new Date(vm.list[i].created);
      vm.list[i].created = vm.list[i].created.toLocaleDateString();

      vm.list[i].user.dateOfbirth = new Date(vm.list[i].user.dateOfbirth);
      vm.list[i].user.dateOfbirth = vm.list[i].user.dateOfbirth.toLocaleDateString();
    }
  }

  function editHelpRequest(index) {
    var token = $auth.getToken(); // user token
    //var user_id = $auth.getPayload().sub; //user ID
    var helpRequestId = vm.list[index]._id;
    $http({
        method: 'PUT',
        url: 'http://localhost:5000/api/helprequests/' + helpRequestId,
        headers: {
          'Authorization': token
        },
        data: {
          'helprequests': vm.list[index]
        }
      })
      .then(function(response) {
        console.log("post", response);
      })
      .catch(function(error, status) {
        console.log(error);
      });
  }


  function init() {
    userList();
  }


}
