export var helpmeComment = {

  controller: HelpmeCommentController,
  controllerAs: 'vm',
  templateUrl: 'app/components/comment/comment.html'
};

function HelpmeCommentController($auth, $http, DataModels) {
  'ngInject';

  var vm = this;
vm.$onInit = init;
  vm.DataModels = DataModels;
  vm.getComment = getComment;
  vm.postComment = postComment;
  vm.deleteComment = deleteComment;
  vm.editComment = editComment;
  vm.currentDate = Date.now();
    vm.comments={};
  vm.user = user;

function getComment() {
    $http({
      method: "GET",
      url: "http://localhost:5000/api/comments",
    })
    .then(function(response) {
        vm.comments = response.data;
        console.log(vm.comments);
    })
    .catch(function(error, status) {
        console.log(error);
    });
  }
  function postComment() {
    console.log('posted');
    var token = $auth.getToken()
    $http({
        method: 'POST',
        url: 'http://localhost:5000/api/comments',
        headers: {
          'Authorization': token
        },
        data: {
          'comment': vm.comment
        }
      })
      .then(function(response) {
        console.log("post", response);
        getComment();
      })
      .catch(function(error, status) {
        console.log(error);
      });
  }

  function deleteComment(comment_id) {
       var token = $auth.getToken()
    $http({
        method: 'DELETE',
        url: 'http://localhost:5000/api/comments/' + comment_id,
        headers: {
          'Authorization': token
        },
        data: {
          'comment': vm.comment
        }
      })
      .then(function(response) {
        console.log(response.data);
       vm.comments= response.data;
        getComment();
      })
    
  }


  function editComment(comment_id) {
    var token = $auth.getToken()
    $http({
        method: 'PUT',
        url: 'http://localhost:5000/api/comments/' + comment_id,
        headers: {
          'Authorization': token
        },
        data: {
          'comment': vm.comment
        }
      })
      .then(function(response) {
        console.log("post", response.data);
         vm.comments= response.data;
         getComment();
      })
      .catch(function(error, status) {
        console.log(error);
      });
  }

  function user() {
    var token = $auth.getToken(); // user token
    var user_id = $auth.getPayload().sub; // user ID
    $http({
        method: 'GET',
        url: 'http://localhost:5000/api/users/' + user_id,
      })
      .then(function(response) {
        vm.user = response.data;
      })
      .catch(function(error, status) {
        console.log(error);
      });
  }

  function init() {
    user();
       getComment();
  }


}
