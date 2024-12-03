import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

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
const db = getFirestore(app)

const handleresetpassword = (email: string) => {
    sendPasswordResetEmail(auth, email)
    .then(() => {
        alert("Password reset email sent. Check your inbox.");
    })
    .catch((error) => {
        alert("Error sending password reset email: " + error.message);
    });
};

//  Example Usage
// const userId = "user123";
// const profileData = {
//     name: "John Doe",
//     email: "john.doe@example.com",
//     bio: "Software Developer"
// };

// createUserProfile(userId, profileData);
const createUserProfile = async (userId: string, profileData: { [key: string]: any }) => {
    try {
        await setDoc(doc(db, "users", userId), profileData);
        alert("User profile created successfully.");
    } catch (error) {
        alert("Error creating user profile: " + (error as any).message);
    }
};

// how to use updateUserProfile
// const userId = "user123";
// const updatedProfileData = {
//     bio: "Updated bio"
// };

// updateUserProfile(userId, updatedProfileData);
const updateUserProfile = async (userId: string, profileData: { [key: string]: any }) => {
    try {
        await updateDoc(doc(db, "users", userId), profileData);
        alert("User profile updated successfully.");
    } catch (error) {
        alert("Error updating user profile: " + (error as any).message);
    }
};

// Example usage
// const userId = "user123";

// getUserProfile(userId).then(profileData => {
//     if (profileData) {
//         console.log("User Profile:", profileData);
//     }
// });
const getUserProfile = async (userId: string) => {
    try {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            alert("No such user profile!");
            return null;
        }
    } catch (error) {
        alert("Error getting user profile: " + (error as any).message);
        return null;
    }
};

export { app, auth, handleresetpassword, db, createUserProfile, updateUserProfile, getUserProfile };