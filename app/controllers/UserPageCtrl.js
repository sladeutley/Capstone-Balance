"use strict";

angular
  .module("balance")
  .controller("UserPageCtrl", function(
    $scope,
    $window,
    $location,
    CategoryFactory,
    $route
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

    //delete category function
    //WHEN DELETE BOARD, DOES IT DELETE GOALS TOO IN THE FIREBASE????? no
    // actually do I want it to do that? Bc what if I have a goal autosuggestion thing, do I want the suggestions to be of all goals ever created or just the ones currently posted

    $scope.deleteUserCategory = categoryId => {
        CategoryFactory.deleteCategory(categoryId)
        .then(() => {
            CategoryFactory.getCategories();
            $route.reload();
        });
      };

    $scope.goToCategoryPage = (categoryId) => {
        console.log('categoryId',categoryId);
        $location.url(`/categories/${categoryId}`);
    };


    //compare index of click to index of $scope.labels. $scope.labels[]
    $scope.goToCategory = (event) => {
        console.log('$scope.categories[event[0]._index].id',$scope.categories[event[0]._index].id);
        let url = `/categories/${$scope.categories[event[0]._index].id}`;
        $location.path(url);
        $scope.$apply();
    };
  });
