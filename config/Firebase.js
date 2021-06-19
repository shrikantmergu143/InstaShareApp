import * as firebase from 'firebase';
import "firebase/auth";
require('firebase/firestore')
require('firebase/app')
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export default db;