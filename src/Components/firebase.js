import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyAtgW0yKi679r9qJJJIdJNkVyb79qnRpF8",
  authDomain: "reaume-builder-6bf2f.firebaseapp.com",
  projectId: "reaume-builder-6bf2f",
  storageBucket: "reaume-builder-6bf2f.appspot.com",
  messagingSenderId: "375168229604",
  appId: "1:375168229604:web:b50aa34e2408cbaa8bccf1",
  measurementId: "G-F3JC3H0XQ3"
};
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const auth = getAuth();
export const database = getDatabase();
export default app;