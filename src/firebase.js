import firebase from "firebase"
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAK-sZIE-zXY-CrZC-E4GbSQO_wKUaSPk8",
  authDomain: "bt3103-week-6-b9a3b.firebaseapp.com",
  projectId: "bt3103-week-6-b9a3b",
  storageBucket: "bt3103-week-6-b9a3b.appspot.com",
  messagingSenderId: "563995851888",
  appId: "1:563995851888:web:e441593ffacd4c582b48b5",
  measurementId: "G-7CRH0V0RME"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();

export default database;

