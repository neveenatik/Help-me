export var helpmeUsersHelpRequestList = {
  controller: HelpmeUsersHelpRequestListController,
  controllerAs: 'vm',
  templateUrl: 'app/components/users-help-request-list/users-help-request-list.html'
};

function HelpmeUsersHelpRequestListController($auth, $http, $log, $state) {
  'ngInject';

  var vm = this;
  vm.$onInit = init;
  vm.$log = $log;

  vm.list = [];


  function usersList() {
    $http({
      method: "GET",
      url: "http://localhost:5000/api/helprequests",
    })
    .then(function(response) {
        vm.list = response.data;
        console.log(vm.list);
    })
    .catch(function(error, status) {
        console.log(error);
    });
  }

  function init() {
    usersList();
  }


}
