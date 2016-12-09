export var helpmeUserHelpRequestList = {
  controller: HelpmeUserHelpRequestListController,
  controllerAs: 'vm',
  templateUrl: 'app/components/user-help-request-list/user-help-request-list.html'
};

function HelpmeUserHelpRequestListController($auth, $http, $log, $state, DataModels) {
  'ngInject';

  var vm = this;
  vm.$onInit = init;
  vm.$log = $log;
  vm.DataModels = DataModels;
  vm.editHelpRequest = editHelpRequest;
  vm.deleteHelpRequest = deleteHelpRequest;

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
    console.log(vm.list[index]._id)
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
        console.log("edited", response);
      })
      .catch(function(error, status) {
        console.log(error);
      });
  }

  function deleteHelpRequest(index) {
    var token = $auth.getToken(); // user token
    //var user_id = $auth.getPayload().sub; //user ID
    var helpRequestId = vm.list[index]._id;
    console.log(helpRequestId)
    $http({
        method: 'DELETE',
        url: 'http://localhost:5000/api/helprequests/' + helpRequestId,
        headers: {
          'Authorization': token
        }
      })
      .then(function(response) {
        console.log("deleted", response);
      })
      .catch(function(error, status) {
        console.log(error);
      });
  }


  function init() {
    userList();
  }


}
