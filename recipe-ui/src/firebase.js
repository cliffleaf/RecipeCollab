import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FIREBASE_API_KEY } from './local-config';

// retrive from Firebase - project settings
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "recipecollab-cb277.firebaseapp.com",
  projectId: "recipecollab-cb277",
  storageBucket: "recipecollab-cb277.appspot.com",
  messagingSenderId: "337184889919",
  appId: "1:337184889919:web:59dd46c8cd1193246a6c8a",
  measurementId: "G-8M63PEM8LX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup };
