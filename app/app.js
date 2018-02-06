'use strict';

angular.module("balance", ["ngRoute"])
  .constant("FBUrl", "https://balance-a7ec9.firebaseio.com/")
  .config($routeProvider => {
    $routeProvider
      .when('/register', {
        templateUrl: "partials/user.html",
        controller: "UserCtrl"
      })
      .when('/:id', {
        templateUrl: "partials/users-page.html",
        controller: "UserPageCtrl",
        resolve: {isAuth}
      })
      .otherwise('/');
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