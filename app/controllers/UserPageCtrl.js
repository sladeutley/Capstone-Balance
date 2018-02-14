"use strict";

angular
  .module("balance")
  .controller("UserPageCtrl", function(
    $scope,
    $window,
    $location,
    CategoryFactory,
    GoalFactory,
    $route,
    $routeParams
  ) {
    //GET CATEGORIES
    $scope.labels = [];
    $scope.data = [];
    $scope.type = "pie";

    $scope.categoryIds = [];
    console.log("$scope.categoryIds", $scope.categoryIds);
    console.log("$scope.categories THAT I NEED", $scope.categories);
    // $scope.categories = "";

    let setPieChartData = () => {
      $scope.loaded = false;
      CategoryFactory.getCategories().then(categoriesData => {
        if (categoriesData.length > 0) {
          //doing this bc not able to click on category on pie chart yet
          $scope.categories = categoriesData;
          console.log("$scope.categories THAT I NEED", $scope.categories);
          console.log("categoriesData Ids THAT I NEED", categoriesData.id);
          //
          $scope.categoryIds = [];
          categoriesData.forEach(category => {
            //TRYING TO GIVE EACH CATEGORY AN ID SO WHEN YOU CLICK ON IT, IT ONLY GIVES YOU THAT CATEGORY'S GOALS
            $scope.categoryIds.push(category.id);
            //
            $scope.labels.push(category.name);
            $scope.data.push(category.importance);
          });
          $scope.loaded = true;
          console.log("$scope.categoryIds", $scope.categoryIds);
        } else {
          $scope.message = "Add some categories!";
        }
      });
    };
    
    //execute get categories function
    setPieChartData();

    //toggle between pie and polarArea chart
    let toggleData = () => {
      $scope.loaded = false;
      if ($scope.type === "pie") {
        $scope.data = [];
        setPieChartData();
      } else if ($scope.type === "polarArea") {
        let goalLength = null;
        $scope.data = [];
        $scope.categories.forEach(category => {
          GoalFactory.getUserGoalsForPolarArea(category.id).then(goalsData => {
            goalLength = goalsData.length;
            let counter = 0;
            goalsData.forEach(goal => {
              if (goal.accomplished === true) {
                counter++;
              }
            });
            let goalsAccomplishedPercentage = Math.floor(
              counter / goalLength * 100
            );
            console.log(
              "goalsAccomplishedPercentage",
              goalsAccomplishedPercentage
            );
            // $scope.data = goalsAccomplishedPercentage;
            // $scope.data = (counter / goalLength) * 100;
            // $scope.data.map(jer => jer*2);
            if (!isNaN(goalsAccomplishedPercentage)) {
              //isNaN checks out to see if it is NaN, and ! negates it all
              $scope.data.push(goalsAccomplishedPercentage);
              console.log("$scope.data", $scope.data);
            } else {
              $scope.data.push(0);
            }
          });
          // });
          // $scope.data = [1, 2, 3, 4, 5, 6];
        });
        $scope.loaded = true;
      }
    };

    //execute toggleData function
    //ITS TOGGLING BUT NEEDS TO DISPLAY DIFFERENT DATA
    $scope.toggle = function() {
      $scope.type = $scope.type === "pie" ? "polarArea" : "pie";
      console.log("hi");
      toggleData();
      //call get new data function here, where on 'polarArea', get the goal data so i can filter through the goal.accomplished property, push into an array, and map that to be the data i need
    };

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

    //delete category function
    //WHEN DELETE BOARD, DOES IT DELETE GOALS TOO IN THE FIREBASE????? no
    // actually do I want it to do that? Bc what if I have a goal autosuggestion thing, do I want the suggestions to be of all goals ever created or just the ones currently posted

    $scope.deleteUserCategory = categoryId => {
      CategoryFactory.deleteCategory(categoryId).then(() => {
        CategoryFactory.getCategories();
        $route.reload();
      });
    };

    //update category
    //gets category data and sets it to $scope variables to be used later
    $scope.updateSelectedCategory = categoryId => {
      $scope.toggleModalAddCategory();
      CategoryFactory.getUserCategory(categoryId).then(category => {
        console.log("category", category);
        $scope.categoryItems = category.data;
        $scope.categoryItems.id = categoryId;
      });
    };

    //function that actually updates a category when update button is clicked
    $scope.updateUserCategory = () => {
      console.log("$scope.categoryItems", $scope.categoryItems);
      console.log("$scope.categoryItems.id", $scope.categoryItems.id);
      CategoryFactory.updateCategory(
        $scope.categoryItems.id,
        $scope.categoryItems
      ).then(data => {
        console.log("data for update category", data);
        //UPDATING DATA BUT NOT COMING BACK AS THE UPDATED DATA
        CategoryFactory.getCategories();
        $route.reload();
        // $location.url(`/categories/new/${categoryId}`);
      });
    };

    //go to category page when you click on listed category
    $scope.goToCategoryPage = categoryId => {
      console.log("categoryId", categoryId);
      $location.url(`/categories/${categoryId}`);
    };

    //this is where when you click on a category in chart, you go to that page
    //compare index of click to index of $scope.labels. $scope.labels[]
    $scope.goToCategory = event => {
      console.log(
        "$scope.categories[event[0]._index].id",
        $scope.categories[event[0]._index].id
      );
      let url = `/categories/${$scope.categories[event[0]._index].id}`;
      $location.path(url);
      $scope.$apply();
    };

    //place modal don't know what this was doing
    // $scope.placeModal = () => {
    //   let modal = document.querySelector('.modal');
    //   $scope.cartegoryIdVar = this.board.id;
    //   modal.classList.toggle("is-active");
    // };

    //toggle modal
    $scope.toggleModalSeeCategories = () => {
      document.querySelector('#seeCategories').classList.toggle("is-active");
    };

    $scope.toggleModalAddCategory = () => {
      document.querySelector('#addCategory').classList.toggle("is-active");
    };
  });
