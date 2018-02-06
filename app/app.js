'use strict';

let isAuthorized = (UserFactory) =>
  new Promise((resolve, reject) => {
    UserFactory.isRegisted().then(userBoolean => {
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

angular.module("balance", ["ngRoute"])
  .constant("FBUrl", "https://balance-a7ec9.firebaseio.com/")
  .config($routeProvider => {
    $routeProvider
      .when('/login', {
        templateUrl: "partials/user.html",
        controller: "UserLoginCtrl"
      })
      .when('/:id', {
        templateUrl: "partials/users-page.html",
        controller: "UserPageCtrl",
        resolve: {isAuthorized}
      })
      .otherwise('/');
  })
  .run(FBCreds => {
    let creds = FBCreds;
    let authConfig = {
        apiKey: creds.apiKey,
        authDomain: creds.authDomain
    };
    firebase.initializeApp(authConfig);
  });
console.log('hello');