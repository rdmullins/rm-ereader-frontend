// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHV95x4hl07pZdXsvAdHGp8Ce2k7dXmoY",
  authDomain: "rm-ereader.firebaseapp.com",
  projectId: "rm-ereader",
  storageBucket: "rm-ereader.appspot.com",
  messagingSenderId: "608792239689",
  appId: "1:608792239689:web:86b5ce51b7c5e7a4b2e998",
  measurementId: "G-S1DVNPNNLY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);