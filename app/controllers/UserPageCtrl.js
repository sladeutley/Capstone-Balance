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

    CategoryFactory.getCategories()
        .then(categoriesData => {
            if (categoriesData.length > 0) {
                console.log('categoriesData',categoriesData);
                categoriesData.forEach(category => {
                    console.log(category.name);
                    $scope.labels.push(category.name);
                    $scope.data.push(category.importance);
                });
                console.log($scope.labels);
            } else {
                $scope.message = "Add some categories!";
            }
        });

    //GET GOALS
    //DONT HAVE ANY GOALS YET

    $scope.goalItems = {
      name: "",
      description: "",
      accomplished: false
      //NEED AN NG-OPTION FOR DROPDOWN ON IMPORTANCE
    };

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

    //CANT GET GOALS TO SHOW UP
    let user = UserFactory.getCurrentUser();
    GoalFactory.getUserGoals(user)
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
