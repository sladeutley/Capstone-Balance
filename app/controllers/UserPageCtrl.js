'use strict';

angular.module("balance").controller("UserPageCtrl", function ($scope) {
    $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"];
    $scope.data = [300, 500, 100, 40, 120];
    // $scope.chartItems = [
    //     {
    //         labels: "Download Sales",
    //         data:  300
    //     },
    //     {
    //         labels: "In-Store Sales",
    //         data:  500
    //     },
    //     {
    //         labels: "Mail-Order Sales",
    //         data:  100
    //     },
    //     {
    //         labels: "Tele Sales",
    //         data:  40
    //     },
    //     {
    //         labels: "Corporate Sales",
    //         data:  120
    //     }
    // ];
  });