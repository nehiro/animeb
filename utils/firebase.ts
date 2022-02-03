// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  dev: {
    apiKey: 'AIzaSyBiqjXBUlsNl3oyJ_Fi3JKd6bU7LWL_RUw',
    authDomain: 'animeb-b876d.firebaseapp.com',
    projectId: 'animeb-b876d',
    storageBucket: 'animeb-b876d.appspot.com',
    messagingSenderId: '718058068740',
    appId: '1:718058068740:web:946882dd2efc9063cb4e51',
    measurementId: 'G-YQHGW5Q2Z1',
  },
  prod: {
    apiKey: 'AIzaSyBiqjXBUlsNl3oyJ_Fi3JKd6bU7LWL_RUw',
    authDomain: 'animeb-b876d.firebaseapp.com',
    projectId: 'animeb-b876d',
    storageBucket: 'animeb-b876d.appspot.com',
    messagingSenderId: '718058068740',
    appId: '1:718058068740:web:946882dd2efc9063cb4e51',
    measurementId: 'G-YQHGW5Q2Z1',
  },
};

// Initialize Firebase

const app = initializeApp(
  process.env.NEXT_PUBLIC_PROD ? firebaseConfig.prod : firebaseConfig.dev
);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app, 'asia-northeast1');
export const storage = getStorage(app);
