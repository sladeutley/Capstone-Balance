"use strict";

angular
  .module("balance")
  .controller("CategoryCtrl", function(
    $scope,
    GoalFactory,
    CategoryFactory,
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
          console.log('$scope.goals',$scope.goals);
        } else {
          $scope.message = "Add some categories, and start getting productive!";
        }
      })
      .catch(err => {
        console.log(err);
      });

      //get category name

      CategoryFactory.getCategories()
      .then (categoriesData => {
          categoriesData.forEach((category) => {
            //COULD I DO BRACKET NOTATION HERE?
            if ($scope.goalItems.categoryId == category.id) {
                $scope.categoryName = category.name;
            } 
          });
      });

    //updating goals

    $scope.updateCurrentGoal = goalId => {
      GoalFactory.getUserGoal(goalId)
      .then( (goal) => {
        console.log('goal',goal);
        $scope.goalItems = goal.data;
        $scope.goalItems.id = goalId;
        console.log('$scope.goalItems.id',$scope.goalItems.id);
        console.log('$scope.goalItems',$scope.goalItems);
    });
  };

    $scope.updateGoal = () => {
      console.log('$scope.goalItems',$scope.goalItems);
      GoalFactory.updateUserGoal($scope.goalItems.id, $scope.goalItems) 
      .then ((goal) => {
        console.log('goal in update goal',goal);
        $route.reload();
      });
    };

    // $scope.updateCurrentGoal = ()  => {
    //   GoalFactory.updateUserGoal($routeParams.id, $scope.goalToUpdate)
    //   .then( (data) => {
    //     console.log('update button data',data);
    //   });
    // };

    //REVERT BACK TO FALSE WHEN UNCLICKED
    $scope.isGoalAccomplished = goalId => {
      //for some reason, couldn't pass in $scope.goalList.accomplished and had to create new object with same name(accomplished) to replace the old one and change it to true
      //PROBABLY NOT THE RIGHT WAY TO DO THIS
      let checkbox = document.getElementById("checkbox");
      if (checkbox.checked) {
        console.log("goal checked");
        $scope.setAccomplished = { accomplished: true };
        checkbox.checked = true;
      } else {
        $scope.setAccomplished = { accomplished: false };
        console.log("goal unchecked");
      }
      GoalFactory.updateAccomplishedGoal(goalId, $scope.setAccomplished).then(() => {
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
