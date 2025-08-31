// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOyeAu2AQk0d93ov-LnYj98vWOt2VhpRI",
  authDomain: "hospital-dashboard-de8a3.firebaseapp.com",
  projectId: "hospital-dashboard-de8a3",
  storageBucket: "hospital-dashboard-de8a3.firebasestorage.app",
  messagingSenderId: "538358680724",
  appId: "1:538358680724:web:00d1da1bd953012e55b881",
  measurementId: "G-05M6K45Q9L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getDatabase(app);