"use strict";

angular
  .module("balance")
  .controller("CategoryNewCtrl", function($scope, CategoryFactory, $location, $window) {
    $scope.categoryItems = {
      name: "",
      importance: ""
      //NEED AN NG-OPTION FOR DROPDOWN ON IMPORTANCE
    };
    $scope.addCategory = () => {
    console.log("a new category was added", $scope.categoryItems);
      $scope.categoryItems.uid = firebase.auth().currentUser.uid;
      CategoryFactory.addCategory($scope.categoryItems).then(data => {
        // $location.location.href = "#!/user-page";
        $window.location.href = "#!/user-page";
        //WHY $WINDOW?????
      });
    };
  });
