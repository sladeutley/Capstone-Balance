"use strict";

angular
  .module("balance")
  .controller("UserLoginCtrl", function($scope, UserFactory, $window) {
    $scope.register = () => {
      UserFactory.createUser($scope.account)
        .then(user => {
          console.log("newUser: ", user);
          $scope.log();
        })
        .catch(function({ code, message }) {
          //??what is this doing?
          console.log("wrong info", code, message);
        });
    };

    $scope.login = () => {
      UserFactory.loginUser($scope.account)
        .then(user => {
          console.log("the user is: ", user);
          $window.location.href = "#/:id";
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
