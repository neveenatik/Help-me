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

  vm.responseList = [];

  
  function userList() {
    var token = $auth.getToken();
    var user_id = $auth.getPayload().sub
    $http({
      method: 'GET',
      url: 'http://localhost:5000/api/helprequests/user/'+user_id,
      headers: {
        'Authorization': token
      }
    })
    .then(function(response) {
        vm.responseList = response.data;
        //modifyList();
        console.log(vm.responseList)
    })
    .catch(function(error, status) {
        console.log(error);
    });
  }

  function modifyList() {
    for(var i = 0; i < vm.responseList.length; i++) {
      vm.responseList[i].created = new Date(vm.responseList[i].created);
      vm.responseList[i].created = vm.responseList[i].created.toLocaleDateString();

      vm.responseList[i].user.dateOfbirth = new Date(vm.responseList[i].user.dateOfbirth);
      vm.responseList[i].user.dateOfbirth = vm.responseList[i].user.dateOfbirth.toLocaleDateString();
    } 
  }


  function init() {
    userList();
  }


}
