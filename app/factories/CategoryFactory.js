"use strict";

angular.module("balance").factory("CategoryFactory", (FBUrl, $http, $q) => {
  function getCategory() {
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
        .post(`${FBUrl}/items.json`, JSON.stringify(category))
        .then(data => {
          console.log("New Category Added", { data }.name);
          console.log("New Category Added", data.data.name);
          resolve(data.data);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  }

  return { getCategory, addCategory };
});
