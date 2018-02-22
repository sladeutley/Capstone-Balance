'use strict';

angular.module("balance").controller("AllGoalsCtrl", function($scope, GoalFactory){

    
    
    //get all goals
    $scope.allGoals = [];
    GoalFactory.getAllGoals().then(goalsData => {
        let userGoals = Object.entries(goalsData);
        console.log('userGoals.length',userGoals.length); //eventually, get it so if user has no goals, have a message saying 'add goals'
        userGoals.forEach(goal => {
            console.log('goal[1].uid',goal[1].uid);
            if (goal[1].uid === firebase.auth().currentUser.uid) {

                $scope.allGoals.push(goal[1]);
            }
        });
        console.log('$scope.allGoals',$scope.allGoals);
        // if (goalsData.length > 0) {
        // } else {
        //     $scope.message = "Add some goals!";
        // }
    })
    .catch(err => {
        console.log(err);
      });

});