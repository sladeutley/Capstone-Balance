"use strict";

angular
  .module("balance")
  .controller("UserPageCtrl", function(
    $scope,
    $window,
    CategoryFactory,
    GoalFactory,
    UserFactory
  ) {
    //GET CATEGORIES
    $scope.labels = [];
    $scope.data = [];

    CategoryFactory.getCategories().then(categoriesData => {
      if (categoriesData.length > 0) {
        categoriesData.forEach(category => {
          $scope.labels.push(category.name);
          $scope.data.push(category.importance);
        });
      } else {
        $scope.message = "Add some categories!";
      }
    });

    //adding goals

    $scope.addGoal = () => {
      console.log("a new goal was added", $scope.goalItems);
      $scope.goalItems.uid = firebase.auth().currentUser.uid;
      //COULD I USE A "firebase.auth().currentUser.uid" below in "getUserGoals" to get user id???
      GoalFactory.addNewGoal($scope.goalItems).then(data => {
        // $location.location.href = "#!/user-page";
        $window.location.href = "#!/user-page";
        //WHY $WINDOW?????
      });
    };

    //getting goals

    $scope.goalItems = {
        name: "",
        description: "",
        accomplished: false,
        categoryId: "",
        //NEED AN NG-OPTION FOR DROPDOWN ON IMPORTANCE
      };

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
