// initializing firebase

import { Analytics, getAnalytics } from "firebase/analytics";
import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
import { FirebaseStorage, getStorage } from 'firebase/storage'
import 'firebase/functions'
import { Functions, getFunctions } from "firebase/functions";

const firebaseConfig = {
      
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY, 
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,


};

const app: FirebaseApp = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const storage: FirebaseStorage = getStorage(app);
const firestore: Firestore = getFirestore(app);
const analytics: Analytics = getAnalytics(app);

const functions:Functions = getFunctions(app);



export { auth, firestore, analytics, storage };