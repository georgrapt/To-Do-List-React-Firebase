// it's how we authenticate our React application with our Firebase database
// src/firebase.js
import firebase from 'firebase'
 // Initialize Firebase
var config = {
    apiKey: "AIzaSyBOrGc43Tx4uRqbYLOvxMG8__VMnLG3Bos",
    authDomain: "fun-food-friends-deb82.firebaseapp.com",
    databaseURL: "https://fun-food-friends-deb82.firebaseio.com",
    projectId: "fun-food-friends-deb82",
    storageBucket: "fun-food-friends-deb82.appspot.com",
    messagingSenderId: "1052770332375"
  };
firebase.initializeApp(config);
export default firebase;