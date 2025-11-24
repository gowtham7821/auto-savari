import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace with your actual Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCud1zSvHAXBI1ey732GdJG4gML06iNXgQ",
    authDomain: "pincode-picker.firebaseapp.com",
    projectId: "pincode-picker",
    storageBucket: "pincode-picker.firebasestorage.app",
    messagingSenderId: "976346543548",
    appId: "1:976346543548:web:2beb261920025a814de7b9",
    measurementId: "G-NTPFLZX22N"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
