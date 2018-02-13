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

        //add category

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
            CategoryFactory.getCategories();
            $route.reload();
            // $window.location.href = "#!/user-page";
            //WHY $WINDOW?????
          });
        };

    //GET CATEGORIES
    $scope.labels = [];
    $scope.data = [];
    $scope.type = 'polarArea';

    //ITS TOGGLING BUT NEEDS TO DISPLAY DIFFERENT DATA
    $scope.toggle = function () {
      $scope.type = $scope.type === 'polarArea' ?
        'pie' : 'polarArea';
    };

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
    $scope.updateSelectedCategory = categoryId => {
      CategoryFactory.getUserCategory(categoryId)
      .then((category) => {
        console.log('category',category);
        $scope.categoryItems = category.data;
        $scope.categoryItems.id = categoryId;
      });
    };


    $scope.updateUserCategory = () => {
      console.log('$scope.category',$scope.category);
      console.log('$scope.category.id',$scope.category.id);
      CategoryFactory.updateCategory($scope.category.id, $scope.category)
      .then( (data) => {
        $route.reload();
        // $location.url(`/categories/new/${categoryId}`);
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
