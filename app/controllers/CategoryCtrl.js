'use strict';

angular.module("balance").controller("CategoryCtrl", function ($scope, GoalFactory, $routeParams, $window, $route) {

        //adding goals
        let CategoryId = $routeParams.id;
        $scope.goalItems = {
            name: "",
            description: "",
            accomplished: false,
            categoryId: CategoryId
            //NEED AN NG-OPTION FOR DROPDOWN ON IMPORTANCE
          };
      
          $scope.addGoal = () => {
            console.log("a new goal was added", $scope.goalItems);
            $scope.goalItems.uid = firebase.auth().currentUser.uid;
            //COULD I USE A "firebase.auth().currentUser.uid" below in "getUserGoals" to get user id???
            GoalFactory.addNewGoal($scope.goalItems).then(data => {
              // $location.location.href = "#!/user-page";
              $route.reload();
            //   $window.location.href = "#!/user-page";
              //WHY $WINDOW?????
            });
          };
      
          //getting goals
      
          GoalFactory.getUserGoals()
            .then(goalsData => {
              if (goalsData.length > 0) {
                $scope.goals = goalsData;
              } else {
                $scope.message = "Add some categories, and start getting productive!";
              }
            })
            .catch(err => {
              console.log(err);
            });
});