import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXl3ku-C7CbWpevI94cOpnyN-LZ84VazA",
  authDomain: "zeon-store-9c514.firebaseapp.com",
  databaseURL:
    "https://zeon-store-9c514-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "zeon-store-9c514",
  storageBucket: "zeon-store-9c514.appspot.com",
  messagingSenderId: "1052383016385",
  appId: "1:1052383016385:web:2ea0b4c4ab40b0b80aab40",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export default database;
