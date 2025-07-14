import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAFRMrgeMfFRWno_VIF8QLMmrHG7o0ZkUY",
  authDomain: "webapp-87f32.firebaseapp.com",
  projectId: "webapp-87f32",
  storageBucket: "webapp-87f32.firebasestorage.app",
  messagingSenderId: "349767836675",
  appId: "1:349767836675:web:0f805faea4112c4b799a36",
  measurementId: "G-E58NDKVSKV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;