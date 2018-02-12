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
        // hideWhenLoggedIn: true
      },
      {
        name: "user page",
        url: "#!/user-page",
      },
      {
        name: "new category",
        url: "#!/categories/new"
      },
      {
        name: "logout",
        url: "#!/logout"
      }
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
        //NEED TO GET IT SO IF USER CHANGES URL, IT GOES BACK TO /LOGIN IN URL
      } else {
        $window.location.href = navUrl;
      }
    };

    // $scope.logout = () =>{
    //   UserFactory.logoutUser();
    // };
  });
