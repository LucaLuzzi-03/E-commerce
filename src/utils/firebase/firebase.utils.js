import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDMN9gqtDrCLncOWSPKXPkzyBXrEqp7JBc",
    authDomain: "crown-clothing-db-912ac.firebaseapp.com",
    projectId: "crown-clothing-db-912ac",
    storageBucket: "crown-clothing-db-912ac.appspot.com",
    messagingSenderId: "459593160120",
    appId: "1:459593160120:web:ab3ff729d4d0e52761ab4d"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  });


  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  const db = getFirestore();


  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt
        });
      } catch (error) {
        console.log('error creating the user', error.message);
      }
    }

    return userDocRef;
  }