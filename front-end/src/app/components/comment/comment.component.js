export var helpmeComment = {
  bindings: {
    helpRequest: '<'
  },
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
  vm.user = user;

  function getComment() {
    console.log(vm.helpRequest);
    var token = $auth.getToken();
    $http({
        method: 'GET',
        url: 'http://localhost:5000/api/comments/helprequest/'+ vm.helpRequest,
        headers: {
          'Authorization': token
        }
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
    console.log(vm.comment);
    var token = $auth.getToken()
    $http({
        method: 'POST',
        url: 'http://localhost:5000/api/comments',
        headers: {
          'Authorization': token
        },
        data: {
          'comment': vm.comment,
          'helpRequest': vm.helpRequest
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

  function deleteComment(id) {
    var token = $auth.getToken()
    $http({
        method: 'DELETE',
        url: 'http://localhost:5000/api/comments/' + id,
        headers: {
          'Authorization': token
        }
      })
      .then(function(response) {
        console.log(response.data);
        vm.comment = response.data;
        getComment();
      })

  }


  function editComment(id) {
    var token = $auth.getToken()
    $http({
        method: 'PUT',
        url: 'http://localhost:5000/api/comments/' + id,
        headers: {
          'Authorization': token
        },
        data: {
          'comment': vm.newComment
        }
      })
      .then(function(response) {
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
