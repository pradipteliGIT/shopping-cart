/* eslint-disable consistent-return */
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { firebaseConfig } from './config';

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const fireStore = firebase.firestore();

// Creating provider for login type
const googleProvider = new firebase.auth.GoogleAuthProvider();
// prompt message to select account
googleProvider.setCustomParameters({ prompt: 'select_account' });
// Exporting google sign in method
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

// Method to update user data in db
export const handleUserProfile = async (userAuth, additionalData) => {
  if (!userAuth) return;
  // destructors uid
  const { uid } = userAuth;
  // query to get document with given uid if exists
  const useRef = fireStore.doc(`users/${uid}`);
  const snapshot = await useRef.get(); // returns document if exists
  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const timeStamp = new Date();
    try {
      await useRef.set({
        displayName,
        email,
        createdDate: timeStamp,
        ...additionalData,
      });
    } catch (err) {
      console.log(err);
    }
  }
  return useRef;
};
