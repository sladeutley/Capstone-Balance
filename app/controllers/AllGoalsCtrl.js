"use strict";

angular
  .module("balance")
  .controller("AllGoalsCtrl", function(
    $scope,
    GoalFactory,
    CategoryFactory,
    $routeParams,
    $window,
    $route,
    $q
  ) {
    //adding goals

    $scope.goalItems = {
      goal: "",
      details: "",
      accomplished: false,
      // categoryId: CategoryId
      categoryId: ""
    };
    $scope.goalItems.categoryId = $routeParams.id;

    $scope.addGoal = () => {
      console.log("a new goal was added", $scope.goalItems);
      $scope.goalItems.uid = firebase.auth().currentUser.uid;
      //COULD I USE A "firebase.auth().currentUser.uid" below in "getUserGoals" to get user id???
      GoalFactory.addNewGoal($scope.goalItems).then(data => {
        // $location.location.href = "#!/user-page";
        // GoalFactory.getUserGoals();
        $route.reload();
        //   $window.location.href = "#!/user-page";
        //WHY $WINDOW?????
      });
    };

    //getting goals

    // $scope.determineIfHasDetails = (goal) => {
    //   // console.log('goal.details',goal.details);
    //   console.log('goal.details.length',goal.details.length);
    //   if (goal.details.length === 0) {
    //     console.log('goal for no length',goal);
    //     $scope.hasNoDetails = true;
    //   } else {
    //     console.log('goal for has length',goal);
    //     $scope.hasNoDetails = false;
    //   }
    //   console.log('$scope.hasNoDetails',$scope.hasNoDetails);
    // };

    // GoalFactory.getUserGoals()
    //   .then(goalsData => {
    //     console.log('goalsData.length',goalsData.length);
    //     console.log('goalsData',goalsData);
    //     if (goalsData.length > 0) {
    //       $scope.goals = goalsData;
    //       console.log('$scope.goals',$scope.goals);
    //       //to determine whether or not to display "details"
    //       // goalsData.forEach(userGoal => {
    //       //   $scope.determineIfHasDetails(userGoal);
    //       //   console.log('$scope.determineIfHasDetails(userGoal)',$scope.determineIfHasDetails(userGoal));

    //       // goalsData.forEach(goal => {
    //       //   // $scope.determineIfHasDetails = () => {
    //       //   // // console.log('goal.details',goal.details);
    //       //   // console.log('goal.details.length',goal.details.length);
    //       //   if (goal.details.length === 0) {
    //       //     console.log('goal for no length',goal);
    //       //     $scope.hasNoDetails = true;
    //       //   } else if (goal.details.length > 0) {
    //       //     console.log('goal for has length',goal);
    //       //     $scope.hasNoDetails = false;
    //       //   }
    //       //   console.log('$scope.hasNoDetails',$scope.hasNoDetails);
    //       // // };
    //       // });
    //     } else {
    //       $scope.message = "Add some categories, and start getting productive!";
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });

    //get all goals

    // $scope.allGoals = null;
    $scope.theCatId = [];
    $scope.categoryName = [];

    // GoalFactory.getAllGoals().then(goalsData => {
    //   let userGoals = Object.entries(goalsData);
    // //   console.log("userGoals.length", userGoals.length); //eventually, get it so if user has no goals, have a message saying 'add goals'
    //   userGoals.forEach(goal => {
    //     // console.log("goal[1].uid", goal[1].uid);
    //     // console.log("goal[1]", goal[1]);
    //     if (goal[1].uid === firebase.auth().currentUser.uid) {
    //       $scope.allGoals.push(goal[1]);
    //       $scope.theCatId.push(goal[1].categoryId);
    //     }
    //   });
    // });

    GoalFactory.getAllGoals()
      .then(goalsData => {
        let promiseArr = [];
        if (goalsData.length > 0) {
          $scope.allGoals = goalsData;
          $scope.allGoals.forEach(goal => {
              CategoryFactory.getUserCategory(goal.categoryId).then(cat => {
                  if (cat.data === null) {
                    console.log("jer");
                    console.log('goal.id',goal.id);
                    //deleting goals here that categories have been deleted but still are in firebase
                    GoalFactory.deleteGoal(goal.id).then(() => {
                        GoalFactory.getUserGoals();
                        $route.reload();
                      });
                  } else {
                  goal.categoryName = cat.data.name;
                  console.log('goal.categoryName',goal.categoryName);
                  }
              });
        //     promiseArr.push(CategoryFactory.getUserCategory(goal.categoryId));
          });
        //   console.log('$scope.allGoals',$scope.allGoals);
        // console.log('$scope.allGoals.categoryName',$scope.allGoals.categoryName);
        //   console.log('promiseArr',promiseArr);
        //   return $q.all(promiseArr)
        //   .then(data => {
        //       console.log('data',data);
        //   });
        //   CategoryFactory.getCategories().then(categoriesData => {
        //     categoriesData.forEach(category => {
        //       console.log("category", category);
            //   console.log('$scope.allGoals.categoryId',$scope.allGoals.categoryId);
            //   if ($scope.allGoals.categoryId === category.id) {
            //     $scope.allGoals.categoryName = category.name;
            //     // console.log('$scope.allGoals.categoryName',$scope.allGoals.categoryName);
            //   }
            // });
        //   });
        } else {
          $scope.message = "Add some categories, and start getting productive!";
        }
      })
      .catch(err => {
        console.log(err);
      });

    // console.log('allGoals',$scope.allGoals);
    // console.log('$scope.theCatId',$scope.theCatId);

    // CategoryFactory.getCategories()
    //   .then(categoriesData => {
    //     categoriesData.forEach(category => {
    //         console.log('category',category);
    //       $scope.theCatId.forEach(catId => {
    //         if (catId === category.id) {
    //           $scope.categoryName.push(category.name);
    //           console.log("$scope.categoryName", $scope.categoryName);
    //         } else {
    //             console.log("not working");
    //         }
    //       });
    //     });
    //   })

    //   .catch(err => {
    //     console.log(err);
    //   });
    // });

    //get category name

    //   CategoryFactory.getCategories()
    //   .then (categoriesData => {
    //       categoriesData.forEach((category) => {
    //         //COULD I DO BRACKET NOTATION HERE?
    //         if ($scope.goalItems.categoryId == category.id) {
    //             $scope.categoryName = category.name;
    //         }
    //       });
    //   });

    //updating goals

    $scope.updateCurrentGoal = goalId => {
      $scope.toggleModalAddGoal();
      $scope.gId = goalId;
      GoalFactory.getUserGoal(goalId).then(goal => {
        console.log("goal", goal);
        $scope.goalItems = goal.data;
        $scope.goalItems.id = goalId;
        console.log("$scope.goalItems.id", $scope.goalItems.id);
        console.log("$scope.goalItems", $scope.goalItems);
      });
    };

    $scope.updateGoal = () => {
      console.log("$scope.goalItems", $scope.goalItems);
      GoalFactory.updateUserGoal($scope.goalItems.id, $scope.goalItems).then(
        goal => {
          console.log("goal in update goal", goal);
          GoalFactory.getUserGoals();
          $route.reload();
        }
      );
    };

    // $scope.updateCurrentGoal = ()  => {
    //   GoalFactory.updateUserGoal($routeParams.id, $scope.goalToUpdate)
    //   .then( (data) => {
    //     console.log('update button data',data);
    //   });
    // };

    //REVERT BACK TO FALSE WHEN UNCLICKED
    $scope.isGoalAccomplished = goalId => {
      //for some reason, couldn't pass in $scope.goalList.accomplished and had to create new object with same name(accomplished) to replace the old one and change it to true
      //PROBABLY NOT THE RIGHT WAY TO DO THIS
      let checkbox = document.getElementById(`checkbox${goalId}`);
      console.log("checkbox", checkbox);
      if (checkbox.checked) {
        console.log("goal checked");
        $scope.setAccomplished = { accomplished: true };
        checkbox.checked = true;
      } else {
        $scope.setAccomplished = { accomplished: false };
        console.log("goal unchecked");
        checkbox.checked = false;
      }
      GoalFactory.updateAccomplishedGoal(goalId, $scope.setAccomplished).then(
        () => {
          GoalFactory.getUserGoals();
          // $route.reload();
        }
      );
    };

    //write a function that when user reloads page, it loads the unchecked items first, then the checked. right now the check mark gets erased

    //deleting goals

    $scope.deleteUserGoal = goalId => {
      GoalFactory.deleteGoal(goalId).then(() => {
        GoalFactory.getUserGoals();
        $route.reload();
      });
    };

    //toggle modal
    $scope.toggleModalSeeGoals = () => {
      // $scope.toggleModalAddCategory(); TRYing to get a way to remove last toggle
      document.querySelector("#seeGoals").classList.toggle("is-active");
    };

    $scope.toggleModalAddGoal = () => {
      $scope.gId = "";
      //NEED THIS FOR WHEN AFTER CLICKING UPDATE THEN ADD, IT DOESNT STILL SHOW THE LAST UPDATED ITEMS INFO
      //HOWEVER, WHEN THERE ARE NO GOALS, AN ID WONT ATTACH TO IT, THEN THE GOALS DONT SHOW
      //does it need to be patched?
      $scope.goalItems = {
        goal: "",
        details: "",
        accomplished: false,
        // categoryId: CategoryId
        categoryId: ""
      };
      $scope.goalItems.categoryId = $routeParams.id;
      // $scope.toggleModalSeeCategories();
      document.querySelector("#addGoal").classList.toggle("is-active");
    };
  });
