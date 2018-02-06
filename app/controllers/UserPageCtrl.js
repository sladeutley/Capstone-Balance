'use strict';

angular.module("balance").controller("UserPageCtrl", function ($scope) {
    $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"];
    $scope.data = [300, 500, 100, 40, 120];
    $scope.message = "I have a Jeremy sitting next to me";
  });