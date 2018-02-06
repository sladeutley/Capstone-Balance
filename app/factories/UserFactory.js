'use strict';

angular.module("balance").factory("UserFactory", (FBCreds, $q) => {
    let authObj = {};
    let currentUser = null;

    authObj.createUser = ({ email, password }) => {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    };

    authObj.loginUser = ({ email, password}) => {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    };

    authObj.logoutUser = () => {
        return firebase.auth().signOut();
    };

    authObj.isRegistered = () => {
        return $q((resolve, reject) => {
            firebase.auth().onAuthStateChanged( (user) => {
                console.log("onAuthStateChanged completed");
                if (user) {
                    console.log("user is: ", user);
                    currentUser = user.uid;
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
    };
    return authObj;
});