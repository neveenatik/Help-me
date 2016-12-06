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
  vm.test = test;

  function usersList() {
    $http({
      method: "GET",
      url: "http://localhost:5000/api/helprequests"
    })
    .then(function(response) {
        vm.list = response.data;
        modifyList();
        console.log(vm.list);
    })
    .catch(function(error, status) {
        console.log(error);
    });
  }

  function getGeolocationByCity() {
    var key = 'AIzaSyDw_-A-V1DGof9Mw_q51VQP1_Tj1lCPiwA';
    var token = $auth.getToken();
    $http({
      method: 'GET',
      //url: 'https://maps.googleapis.com/maps/api/geocode/json?address=amsterdam&key=AIzaSyDw_-A-V1DGof9Mw_q51VQP1_Tj1lCPiwA',
      url: 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=amsterdam&destinations=alkmaar&key=AIzaSyC_TuVMQ6Pd4g7pZ8JyV0NshwGjuBqTPaI'
    })
    .then(function(response) {
        console.log(response);
    })
    .catch(function(error, status) {
        console.log(error);
    });
  }

  function init() {
    usersList();
    // var city = 'amsterdam'
     getGeolocationByCity();
  }

  function modifyList() {
    for(var i = 0; i < vm.list.length; i++) {
      vm.list[i].created = new Date(vm.list[i].created);
      vm.list[i].created = vm.list[i].created.toLocaleDateString();

      vm.list[i].user.dateOfbirth = new Date(vm.list[i].user.dateOfbirth);
      vm.list[i].user.dateOfbirth = vm.list[i].user.dateOfbirth.toLocaleDateString();
    } 
  }

  function test(item){
    console.log(vm.list[item].user.city);
  }


}
