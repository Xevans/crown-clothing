import { initializeApp } from 'firebase/app';

import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword, // for email and password native auth
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAdE6U5SAwRqKBInGCScomMo138D-kT4fs",
    authDomain: "crown-clothing-db-aca93.firebaseapp.com",
    projectId: "crown-clothing-db-aca93",
    storageBucket: "crown-clothing-db-aca93.appspot.com",
    messagingSenderId: "822389208514",
    appId: "1:822389208514:web:c61d7122c6bd758a06525b"
  };
  
  // Initialize Firebase
  const firebaseapp = initializeApp(firebaseConfig);
  const googleProvider = new GoogleAuthProvider(); // initialize google auth provider singleton object
  googleProvider.setCustomParameters({
    prompt: "select_account" // prompt user to select google account
  });

  export const auth = getAuth();
  export const db = getFirestore();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);  
  
  // sign up with email and password
  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return; // base case, no wmail or passowrd provided
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // sign in with email and password
  export const signInUserWithEmailAndPassword = async (email, password) => {
    // check if email and password provided
    if (!email || !password) return;
    return signInWithEmailAndPassword(auth, email, password);
  }


  // Sign out user
  export const signOutUser = () => {
    signOut(auth);
  }  


  // create a user record in the user table. (records are called documents in firebase)
  export const createUserDocumentFromAuth = async (userAuth) => { // access user instance on authentication
    if (!userAuth) return; // base case, no authenticated user object provided
    
    const userDocRef = doc(db, 'users', userAuth.uid); // do operation at the root database (db), user collection/table (users), at this unique id (userAuth.id)
    const userSnapShot = await getDoc(userDocRef); // request a snapshot of the user document (aka user's database recort)
    
    // if user exist
    // create a user document/record with the data from userAuth in my collection
    if(!userSnapShot.exists()) {
        const { displayName, email} = userAuth; // extract needed data from json object
        const createdAt = new Date();
        // try to create a user record with the provided parameters. Catch if err.
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch(error) {
            console.log('error creating user document', error.message);
        }
    } 
    else { // if user does not exist
        return userDocRef;
    };  
}
