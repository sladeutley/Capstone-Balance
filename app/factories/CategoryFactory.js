"use strict";

angular.module("balance").factory("CategoryFactory", (FBUrl, $http, $q) => {
  
  //DON't KNOW IF I NEED AN OBJECT.KEYS, MAYBE JUST NEED THAT FOR GOALS, AND TO PASS USER ID INTO GET CATEGORIES
    function getCategories() {
    return $q((resolve, reject) => {
      $http
        .get(
          `${FBUrl}/categories.json?orderBy="uid"&equalTo="${
            firebase.auth().currentUser.uid
          }"`
        )
        .then(({ data }) => {
          console.log("categories", data);
          let categoryArr = Object.keys(data).map(categoryKey => {
            console.log("categoryKey", categoryKey);
            data[categoryKey].id = categoryKey;
            //I'd LIKE TO REVIEW THIS OBJECT.KEYS - i get what its doing, just not how its working
            return data[categoryKey];
          });
          console.log("categoryArr", categoryArr);
          resolve(categoryArr);
        });
    });
  }

  function addCategory(category) {
    return $q((resolve, reject) => {
      $http
        .post(`${FBUrl}/categories.json`, JSON.stringify(category))
        .then(data => {
          console.log("New Category Added", data.data.name);
          resolve(data.data);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  }

  function deleteCategory(categoryId) {
    return $q((resolve, reject) => {
      $http
        .delete(`${FBUrl}/categories/${categoryId}.json`)
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  function updateCategory(category, categoryId) {
    return $q((resolve, reject) => {
      $http
        .put(`${FBUrl}/goals/${categoryId}.json`, JSON.stringify(category))
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  return { getCategories, addCategory, deleteCategory, updateCategory };
});
