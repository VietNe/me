import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "portfolio-v1-e5b94.firebaseapp.com",
  databaseURL: "https://portfolio-v1-e5b94.firebaseio.com",
  projectId: "portfolio-v1-e5b94",
  storageBucket: "portfolio-v1-e5b94.appspot.com",
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
