"use strict";

angular
  .module("balance")
  .controller("UserPageCtrl", function(
    $scope,
    $window,
    $location,
    CategoryFactory,
    GoalFactory,
    UserFactory
  ) {
    //GET CATEGORIES
    $scope.labels = [];
    $scope.data = [];

    $scope.categoryIds = [];

    CategoryFactory.getCategories().then(categoriesData => {
      if (categoriesData.length > 0) {
        //doing this bc not able to click on category on pie chart yet
        $scope.categories = categoriesData;
        //
        categoriesData.forEach(category => {
          //TRYING TO GIVE EACH CATEGORY AN ID SO WHEN YOU CLICK ON IT, IT ONLY GIVES YOU THAT CATEGORY'S GOALS
          $scope.categoryIds.push(category.id);
          //
          $scope.labels.push(category.name);
          $scope.data.push(category.importance);
        });
        console.log("$scope.categoryIds", $scope.categoryIds);
      } else {
        $scope.message = "Add some categories!";
      }
    });

    $scope.goToCategoryPage = (categoryId) => {
        $location.url(`/categories/${categoryId}`);
    };

  });
