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
    $scope.labels = [
      "Download Sales",
      "In-Store Sales",
      "Mail-Order Sales",
      "Tele Sales",
      "Corporate Sales"
    ];
    $scope.data = [300, 500, 100, 40, 120];

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
