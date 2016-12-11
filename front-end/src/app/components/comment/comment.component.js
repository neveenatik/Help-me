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
  vm.$auth = $auth;

  function getComment() {
    //var token = $auth.getToken();
    $http({
        method: 'GET',
        url: 'http://localhost:5000/api/comments/helprequest/' + vm.helpRequest,
      })
      .then(function(response) {
        vm.comments = response.data;
      })
      .catch(function(error, status) {
        console.log(error);
      });
  }

  function postComment() {
    if ($auth.isAuthenticated()) {
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
          vm.comment = "";
        })
        .catch(function(error, status) {
          console.log(error);
        });
    } else {
      alert('you need to login first');
    }

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
    if (vm.$auth.isAuthenticated()) {
      user();
    }
    getComment();
  }


}
