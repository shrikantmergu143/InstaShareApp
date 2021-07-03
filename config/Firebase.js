import * as firebase from 'firebase';
import "firebase/auth";
require('firebase/firestore')
require('firebase/app')
const firebaseConfig = {
  apiKey: "AIzaSyA455IScPVXoVAjMP8Kjpogbc2rVM_u0WA",
  authDomain: "instashre-2c6a1.firebaseapp.com",
  databaseURL: "https://instashre-2c6a1-default-rtdb.firebaseio.com",
  projectId: "instashre-2c6a1",
  storageBucket: "instashre-2c6a1.appspot.com",
  messagingSenderId: "758145740018",
  appId: "1:758145740018:web:cfebe0d0d2b43bef61346b"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export default db;