import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBiwRqF1oqH2ASZ591ahvatMXQX5nub-L4",
  authDomain: "project-a9e2f98f-7ba8-4a66-be9.firebaseapp.com",
  projectId: "project-a9e2f98f-7ba8-4a66-be9",
  storageBucket: "project-a9e2f98f-7ba8-4a66-be9.firebasestorage.app",
  messagingSenderId: "151578937894",
  appId: "1:151578937894:web:bd0281ce36d2f7a94034e7",
  measurementId: "G-8ECN4F02ND",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, "wh3-dev-firestore");
