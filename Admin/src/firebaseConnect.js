// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCVY_kHgDLFfDXG2sCth0GwxcwXh7rcKNY",
    authDomain: "luan-van-tt.firebaseapp.com",
    databaseURL: "https://luan-van-tt-default-rtdb.firebaseio.com",
    projectId: "luan-van-tt",
    storageBucket: "luan-van-tt.appspot.com",
    messagingSenderId: "687199875574",
    appId: "1:687199875574:web:28986d072ec57ae81b57d7",
    measurementId: "G-LM70R9CE4E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

const analytics = getAnalytics(app);