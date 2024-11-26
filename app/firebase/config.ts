import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

const auth = getAuth(app)

const handleresetpassword = (email: string) => {
    sendPasswordResetEmail(auth, email)
    .then(() => {
        alert("Password reset email sent. Check your inbox.");
    })
    .catch((error) => {
        alert("Error sending password reset email: " + error.message);
    });
}


export {app, auth, handleresetpassword}
