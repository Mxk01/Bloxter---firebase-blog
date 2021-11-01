// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBcrricSvj3IsTPxV7voez1gCjVxbpa4Es",
    authDomain: "bloxter-b935e.firebaseapp.com",
    projectId: "bloxter-b935e",
    storageBucket: "bloxter-b935e.appspot.com",
    messagingSenderId: "253659654210",
    appId: "1:253659654210:web:4fd9e0f9e14af2638ba5db"
};


let db = null;



// Initialize Firebase
export const initializeFirebase = () => {

    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
}


export const getDB = () => {
    return db;
}