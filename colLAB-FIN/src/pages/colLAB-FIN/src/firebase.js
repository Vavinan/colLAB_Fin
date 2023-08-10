import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, EmailAuthProvider, sendEmailVerification } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage"
import { reauthenticateWithCredential, reauthenticateWithPopup } from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyCouaKIjh5aWsSpQH0a5cd_8Z9ENikwxjc",
  authDomain: "fir-chat-app-2a0d7.firebaseapp.com",
  projectId: "fir-chat-app-2a0d7",
  storageBucket: "fir-chat-app-2a0d7.appspot.com",
  messagingSenderId: "199040834706",
  appId: "1:199040834706:web:d35a816fc9c57efbb79a4b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
export const Google = new GoogleAuthProvider();
export { EmailAuthProvider, sendEmailVerification };
export const getUserDataFromFirestore = async (userId) => {
  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.error('User document not found.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};

