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

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);

const handleresetpassword = (email: string) => {
    sendPasswordResetEmail(auth, email)
    .then(() => {
        alert("Password reset email sent. Check your inbox.");
    })
    .catch((error) => {
        alert("Error sending password reset email: " + error.message);
    });
};

interface ProfileData {
    displayname: string;
    email: string;
    bio?: string;
}

const createUserProfile = async (userId: string, profileData: ProfileData) => {
    try {
        await setDoc(doc(db, "users", userId), profileData);
        alert("User profile created successfully.");
    } catch (error: unknown) {
        if (error instanceof Error) {
            alert("Error creating user profile: " + error.message);
        }
    }
};

const updateUserProfile = async (userId: string, profileData: Partial<ProfileData>) => {
    try {
        await updateDoc(doc(db, "users", userId), profileData);
        alert("User profile updated successfully.");
    } catch (error: unknown) {
        if (error instanceof Error) {
            alert("Error updating user profile: " + error.message);
        }
    }
};

const getUserProfile = async (userId: string): Promise<ProfileData | null> => {
    try {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data() as ProfileData;
        } else {
            alert("No such user profile!");
            return null;
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            alert("Error getting user profile: " + error.message);
        }
        return null;
    }
};

export { app, auth, handleresetpassword, db, createUserProfile, updateUserProfile, getUserProfile };
export type { ProfileData };