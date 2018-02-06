'use strict';

angular.module("balance", ["ngRoute"])
  .constant("FBUrl", "https://balance-a7ec9.firebaseio.com/")
  .config($routeProvider => {
    $routeProvider
      .when('/login', {
        templateUrl: "partials/user.html",
        controller: "UserCtrl"
      })
      .otherwise('/login');
  })
  .run(FBCreds => {
    let creds = FBCreds;
    let authConfig = {
        apiKey: creds.key,
        authDomain: creds.authDomain
    };
    firebase.initializeApp(authConfig);
  });
console.log('hello');