'use strict';

// I DONT THINK THIS IS WORKING. I DONT SEE ANY OF THE CONSOLE LOgS
// actually, it is working when not commented out, but somethings weird about it
let isAuthorized = (UserFactory) =>
  new Promise((resolve, reject) => {
    UserFactory.isRegistered().then(userBoolean => {
      console.log("Who is this user : ", userBoolean);
      if (userBoolean) {
        console.log("User is registered");
        resolve();
      } else {
        console.log("User needs to register!");
        reject();
      }
    });
  });

angular.module("balance", ["ngRoute", 'chart.js'])
  .constant("FBUrl", "https://balance-a7ec9.firebaseio.com/")
  .config($routeProvider => {
    $routeProvider
      .when('/login', {
        templateUrl: "partials/user.html",
        controller: "UserLoginCtrl"
      })
      .when('/user-page', {
        templateUrl: "partials/user-page.html",
        controller: "UserPageCtrl",
        resolve: {isAuthorized}
      })
      //THIS IS NOT DOING ANYTHING ANYMORE
      // .when('/categories/new', {
      //   templateUrl: "partials/category-new.html",
      //   controller: "CategoryNewCtrl",
      //   resolve: {isAuthorized}        
      // })
      .when('/categories/:id', {
        templateUrl: 'partials/category.html',
        controller: 'CategoryCtrl',
        resolve: { isAuthorized }
      })
      .when('/all-goals', {
        templateUrl: 'partials/all-goals.html',
        controller: 'AllGoalsCtrl',
        resolve: { isAuthorized }
      })

      // .otherwise('/new-user'); WANT it to go the page that explains the site and says "get started here" or "register"
      .otherwise('/login');
  })
  .run(FBCreds => {
    let creds = FBCreds;
    let authConfig = {
        apiKey: creds.apiKey,
        authDomain: creds.authDomain
    };
    firebase.initializeApp(authConfig);
  });
