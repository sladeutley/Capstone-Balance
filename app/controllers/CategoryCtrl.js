"use strict";

angular
  .module("balance")
  .controller("CategoryCtrl", function(
    $scope,
    GoalFactory,
    $routeParams,
    $window,
    $route
  ) {
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

    //updating goals

    //TO DO: REVERT BACK TO FALSE WHEN UNCLICKED
    $scope.isGoalAccomplished = goalId => {
      //for some reason, couldn't pass in $scope.goalList.accomplished and had to create new object with same name(accomplished) to replace the old one and change it to true
      //PROBABLY NOT THE RIGHT WAY TO DO THIS
      let checkbox = document.getElementById("checkbox");
      if (checkbox.checked) {
        console.log("goal checked");
        $scope.setAccomplished = { accomplished: true };
      } else {
        $scope.setAccomplished = { accomplished: false };
        console.log("goal unchecked");
      }
      GoalFactory.updateGoal(goalId, $scope.setAccomplished).then(() => {
        GoalFactory.getUserGoals();
        // $route.reload();
      });
    };

    //write a function that when user reloads page, it loads the unchecked items first, then the checked. right now the check mark gets erased

    //deleting goals

    $scope.deleteUserGoal = goalId => {
      GoalFactory.deleteGoal(goalId).then(() => {
        GoalFactory.getUserGoals();
        $route.reload();
      });
    };
  });
