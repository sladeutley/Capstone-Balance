"use strict";

angular
  .module("balance")
  .controller("NavCtrl", function(
    $scope,
    $location,
    $rootScope,
    $window,
    $route,
    UserFactory
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
        name: "logout",
        url: "#!/logout"
      }
    ];

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        $scope.$apply(($scope.isLoggedIn = true));
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
  });
