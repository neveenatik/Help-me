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

  vm.responseList = [];
  vm.destinationsCityArr = [];
  vm.list = [];


  function usersList() {
    $http({
      method: "GET",
      url: "http://localhost:5000/api/helprequests"
    })
    .then(function(response) {
        vm.responseList = response.data;
        modifyList();
    })
    .catch(function(error, status) {
        console.log(error);
    });
  }

  function getDistanceMatrix() {
    var destinationsCity =  getDestinationsCity(); // return all the cities name that we have from vm.responseList as string with '|' pipeline between each city
    var distanceMatrix = [];
    $http({
      method: 'GET',
      url: 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins='+ 
      vm.userCity +'&destinations='+ destinationsCity +'&key=AIzaSyC_TuVMQ6Pd4g7pZ8JyV0NshwGjuBqTPaI'
    })
    .then(function(response) {
        for(var i = 0; i < response.data.destination_addresses.length; i++){
            distanceMatrix.push({
              "city": response.data.destination_addresses[i].slice(0, vm.destinationsCityArr[i].length),
              "distance": response.data.rows[0].elements[i].distance.value
            });
        }
        distanceMatrix.sort(function(a,b) {
          return (a.distance > b.distance) ? 1 : ((b.distance > a.distance) ? -1 : 0); //sort by value of distance
        });
        pushListBySameCity(); // push all the users that have same name of city with current user to vm.list
        for(var i = 0; i < distanceMatrix.length; i++){
          for(var k = 0; k < vm.responseList.length; k++){
            if(distanceMatrix[i].city == vm.responseList[k].user.city){
              vm.list.push(vm.responseList[k]);
            }
          }
        }
    })
    .catch(function(error, status) {
        console.log(error);
    });
  }

  function getUserCity() {
    var user_id = $auth.getPayload().sub;       // user ID
    $http({
        method: 'GET',
        url: 'http://localhost:5000/api/users/' + user_id,
    })
    .then(function(response) {
        vm.userCity = response.data.city;
    })
    .catch(function(error, status) {
        console.log(error);
    });
  }

  function pushListBySameCity() {
    for(var i = 0; i < vm.responseList.length; i++) {
      if(vm.responseList[i].user.city == vm.userCity){
        vm.list.push(vm.responseList[i])
      }
    }
  }

  function modifyList() {
    for(var i = 0; i < vm.responseList.length; i++) {
      vm.responseList[i].created = new Date(vm.responseList[i].created);
      vm.responseList[i].created = vm.responseList[i].created.toLocaleDateString();

      vm.responseList[i].user.dateOfbirth = new Date(vm.responseList[i].user.dateOfbirth);
      vm.responseList[i].user.dateOfbirth = vm.responseList[i].user.dateOfbirth.toLocaleDateString();
    } 
  }

  function getDestinationsCity() {
    var destinationsCity = "";
    //here we have to give vm.destinationsCity one city bcoz when we add any new value in next for we add | with it
    if(vm.responseList[0].user.city != vm.userCity){
      destinationsCity = vm.responseList[0].user.city;
      vm.destinationsCityArr.push(vm.responseList[0].user.city)
    }else{
      destinationsCity = vm.responseList[vm.responseList.length-1].user.city;
      vm.destinationsCityArr.push(vm.responseList[vm.responseList.length-1].user.city)
    }

    for(var i = 0; i < vm.responseList.length; i++) {
      if(vm.responseList[i].user.city != vm.userCity || vm.destinationsCityArr.length > 24){
        if(!vm.destinationsCityArr.includes(vm.responseList[i].user.city)){
          vm.destinationsCityArr.push(vm.responseList[i].user.city);
          destinationsCity += ('|' + vm.responseList[i].user.city);
        }
      }
    }
    return destinationsCity;
  }

  function init() {
    usersList();
    getUserCity();
    if($auth.isAuthenticated()){
      setTimeout(getDistanceMatrix, 700);
    }else{
      vm.list = vm.responseList;
    } 
  }


}
