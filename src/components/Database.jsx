import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";
// import { getStorage } from "firebase/storage";
import "firebase/storage";
import "firebase/database";

// Your web app's Firebase configuration
export const app = initializeApp({
  apiKey: "AIzaSyDOATGTMCxF6PknUnzaJJYERLPWG4d2QnM",
  authDomain: "zeon-store-bb4f8.firebaseapp.com",
  databaseURL:
    "https://zeon-store-bb4f8-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "zeon-store-bb4f8",
  storageBucket: "zeon-store-bb4f8.appspot.com",
  messagingSenderId: "1061024129681",
  appId: "1:1061024129681:web:6f41fd9a02fd7b90a35530",
});

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const database = getDatabase(app);
// export const storage = getStorage(app);
// export default database;
