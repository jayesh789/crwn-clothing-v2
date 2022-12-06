import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  doc, //retrive documents inside firebase database
  getDoc, //to get the data
  setDoc, //to set the data
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyABMfUs4UoBwtpt729Oswy_lrxnVS94utU",
  authDomain: "crwn-clothing-db-d4373.firebaseapp.com",
  projectId: "crwn-clothing-db-d4373",
  storageBucket: "crwn-clothing-db-d4373.appspot.com",
  messagingSenderId: "686759930002",
  appId: "1:686759930002:web:f70aab5cc5d2dfa9071e4b",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if(!userAuth) return;
  
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  //if user data does not exists

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user ", error);
    }
  }

  //if user data exists

  return userDocRef;
};


export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}