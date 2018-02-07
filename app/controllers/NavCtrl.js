"use strict";

angular
  .module("balance")
  .controller("NavCtrl", function(
    $scope,
    $location,
    $rootScope,
    $window,
    $route,
    UserFactory,
    CategoryFactory
    // UserGoalFactory
  ) {
    //DON't NEED THIS UNLESS DOING SEARCH FUNCTION
    // $scope.isUserActive = function(viewLocation) {
    //     return viewLocation === $location.path();
    // };

    $scope.navItems = [
      {
        name: "login",
        url: "#!/login",
        bang: "!"
      },
      {
        name: "user page",
        url: "#!/user-page",
      },
      {
        name: "new category",
        url: "#!/categories/new",
      },
      {
        name: "new goal",
        url: "#!/goal/new",
      },
    ];

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        $scope.isLoggedIn = true;
        $scope.$apply();
      } else {
        $scope.isLoggedIn = false;
        $scope.$apply(); //to update scope
        $window.location.href = "#!/login";
      }
    });

    $scope.navigate = navUrl => {
      console.log("navUrl", navUrl);
      if (navUrl === "#!/logout") {
        UserFactory.logoutUser();
      } else {
        $window.location.href = navUrl;
      }
    };

    $scope.logout = () =>{
      console.log("user", UserFactory.getCurrentUser());
      UserFactory.logoutUser();
    };
  });
