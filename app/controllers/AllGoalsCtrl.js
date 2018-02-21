'use strict';

angular.module("balance").controller("AllGoalsCtrl", function($scope, GoalFactory){

    $scope.allGoals = [];
    //get all goals
    GoalFactory.getAllGoals().then(goalsData => {
        // if (firebase.auth().currentUser.uid === )
        let userGoals = Object.entries(goalsData);
        userGoals.forEach(goal => {
            // if (goal[1].uid )
            console.log('goal[1].uid',goal[1].uid);
            if (goal[1].uid === firebase.auth().currentUser.uid) {

                $scope.allGoals.push(goal[1]);
            }
        });
        console.log('$scope.allGoals',$scope.allGoals);
        // // console.log('$scope.allGoals2',$scope.allGoals2);
        // // console.log('goalsData',goalsData);
        // if (goalsData.length > 0) {
        // } else {
        //     $scope.message = "Add some goals!";
        // }
    })
    .catch(err => {
        console.log(err);
      });

});