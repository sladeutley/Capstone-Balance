"use strict";

angular
  .module("balance")
  .controller("UserPageCtrl", function(
    $scope,
    $window,
    $location,
    CategoryFactory,
    $route, 
    $routeParams
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

    //update category
      CategoryFactory.getUserCategory($routeParams.id)
      .then((category) => {
        console.log('category',category);
        $scope.category = category;
      });


    $scope.updateSelectedCategory = (categoryId) => {
      console.log('$scope.category',$scope.category);
      console.log('categoryId',categoryId);
      CategoryFactory.updateCategory($scope.category, categoryId)
      .then( (data) => {
        $location.url(`/categories/new/${categoryId}`);
      });
    };




    $scope.goToCategoryPage = (categoryId) => {
        console.log('categoryId',categoryId);
        $location.url(`/categories/${categoryId}`);
    };

    //this is where when you click on a category, you go to that page
    //compare index of click to index of $scope.labels. $scope.labels[]
    $scope.goToCategory = (event) => {
        console.log('$scope.categories[event[0]._index].id',$scope.categories[event[0]._index].id);
        let url = `/categories/${$scope.categories[event[0]._index].id}`;
        $location.path(url);
        $scope.$apply();
    };
  });
