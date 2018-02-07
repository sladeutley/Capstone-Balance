"use strict";

angular
  .module("balance")
  .controller("UserLoginCtrl", function($scope, UserFactory, $window) {
    $scope.register = () => {
      UserFactory.createUser($scope.account)
        .then(user => {
          console.log("newUser: ", user);
          $scope.login();
        })
        .catch(function({ code, message }) {
          //??what is this doing?
          console.log("wrong info", code, message);
          $window.alert("This user already exists. Please use a different email.");
        });
    };

    $scope.login = () => {
      UserFactory.loginUser($scope.account)
        .then(user => {
          console.log("the user is: ", user);
          // $window.location.href = "#/:id"; NEED IT TO GO TO USERS PAGE EVENTUALLY
          $window.location.href = "#/user-page";
        })
        .catch(err => {
          console.log("err");
        });
    };
    $scope.logout = () => {
      UserFactory.logoutUser().then(data => {
        console.log("logged out", data);
      });
    };
  });
