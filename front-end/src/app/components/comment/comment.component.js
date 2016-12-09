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
  vm.user = user;

  function getComment() {
    $http({
        method: "GET",
        url: "http://localhost:5000/api/comments",
      })
      .then(function(response) {
        vm.comment = response.data;
        console.log(vm.comment);
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
        vm.comment = response.data;
        getComment();
      })

  }


  function editComment(index) {
    //      console.log(comment_id);
    var commentId = vm.comment[index]._id;
    var token = $auth.getToken()
    $http({
        method: 'PUT',
        url: 'http://localhost:5000/api/comments/' + commentId,
        headers: {
          'Authorization': token
        },
        data: {
          'comment': vm.comment[index]
        }
      })
      .then(function(response) {

        console.log("post", response.data);
        vm.comment = response.data;
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
