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


  //I wanna be able to get these by userId
  // function getUserGoals(userId) {
  //   return $q((resolve, reject) => {
  //     $http
  //       .get(
  //         `${FBUrl}/goals.json?orderBy="uid"&equalTo="${userId}"`
  //       )
  //       .then(({ data }) => {
  //         let goalArr = Object.keys(data).map(goalKey => {
  //           data[goalKey].id = goalKey;
  //           return data[goalKey];
  //         });
  //         resolve(goalArr);
  //       });
  //   });
  // }

  function getUserGoals() {
    console.log("goal factory", firebase.auth().currentUser.uid);
    return $q((resolve, reject) => {
      $http
        .get(
          `${FBUrl}/goals.json?orderBy="uid"&equalTo="${
            firebase.auth().currentUser.uid
          }"`
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

  function updateGoal(goal, goalId) {
    return $q((resolve, reject) => {
      $http
        .patch(`${FBUrl}/goals/${goalId}.json`, JSON.stringify(goal))
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  return { addNewGoal, getUserGoals, deleteGoal, updateGoal };
});
