// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyANS_S8zxo3KMoIAdXlyahFEqczdDb_vC4",
  authDomain: "volunteers-signup-login.firebaseapp.com",
  projectId: "volunteers-signup-login",
  storageBucket: "volunteers-signup-login.appspot.com",
  messagingSenderId: "594920081513",
  appId: "1:594920081513:web:f6d79b6fbb85ed12dcbaf8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
// Initialize Cloud Firestore and get a reference to the service
const fs = getFirestore(app);
const storage = getStorage(app);

export { storage, fs, app };
