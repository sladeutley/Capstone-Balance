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
            // console.log("categoryKey", categoryKey);
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

  //need this to get specific category 
  //MAYBE DONt NEED THIS ONCE YOU HAVE UPDATE CATEGORY ON THE CATEGORY PAGE ITSELF BC YOU WILL HAVE ACCESS TO THE CATEGORY ID
  function getUserCategory(categoryId) {
    return $q((resolve, reject) => {
      $http 
        .get(`${FBUrl}/categories/${categoryId}.json`)
        .then(category => {
          console.log('category',category);
          // category.data.categoryId = categoryId; //had to add property for 'see all goals page' 
          resolve(category);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  function updateCategory(categoryId, category) {
    return $q((resolve, reject) => {
      $http
        .put(`${FBUrl}/categories/${categoryId}.json`, JSON.stringify(category))
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  return { getCategories, addCategory, deleteCategory, getUserCategory, updateCategory };
});
