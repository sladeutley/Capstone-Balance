"use strict";

angular.module("balance").factory("GoalFactory", (FBUrl, $http, $q, $routeParams) => {
  
  function addNewGoal(goal) {
    return $q((resolve, reject) => {
      $http
        .post(`${FBUrl}/goals.json`, JSON.stringify(goal))
        .then(goalData => {
          // resolve(goalData.config.data); WHAT DOES .CONFIG DO??
          resolve(goalData.data);
        })
        .catch(err => {
          console.log(err);
        });
    });
  }


  function getUserGoals() {
    console.log("goal factory", firebase.auth().currentUser.uid);
    return $q((resolve, reject) => {
      $http
        .get(
          `${FBUrl}/goals.json?orderBy="categoryId"&equalTo="${$routeParams.id}"`
        )
        .then(({ data }) => {
          console.log("goals", data);
          let goalArr = Object.keys(data).map(goalKey => {
            console.log("goalKey", goalKey);
            data[goalKey].id = goalKey;
            //I'd LIKE TO REVIEW THIS OBJECT.KEYS - i get what its doing, just not how its working
            return data[goalKey];
          });
          console.log("goalArr", goalArr);
          resolve(goalArr);
        });
    });
  }

  function deleteGoal(goalId) {
    return $q((resolve, reject) => {
      $http
        .delete(`${FBUrl}/goals/${goalId}.json`)
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  function updateAccomplishedGoal(goalId, goalItem) {
    return $q((resolve, reject) => {
      console.log("this is being called");
      $http
        .patch(`${FBUrl}/goals/${goalId}.json`, JSON.stringify(goalItem))
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  //need to get specific goal to update just that goal
  function getUserGoal(goalId) {
    return $q((resolve, reject) => {
      $http 
        .get(`${FBUrl}/goals/${goalId}.json`)
        .then(goal => {
          resolve(goal);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  function updateUserGoal(goalId, goalItem) {
    return $q((resolve, reject) => {
      $http
        .put(`${FBUrl}/goals/${goalId}.json`, JSON.stringify(goalItem))
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  return { addNewGoal, getUserGoals, deleteGoal, getUserGoal, updateAccomplishedGoal, updateUserGoal };
});
