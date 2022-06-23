import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { getStorage } from 'firebase/storage';

// const firebaseConfig = {
//   dev: {
//     apiKey: 'AIzaSyBiqjXBUlsNl3oyJ_Fi3JKd6bU7LWL_RUw',
//     authDomain: 'animeb-b876d.firebaseapp.com',
//     projectId: 'animeb-b876d',
//     storageBucket: 'animeb-b876d.appspot.com',
//     messagingSenderId: '718058068740',
//     appId: '1:718058068740:web:946882dd2efc9063cb4e51',
//     measurementId: 'G-YQHGW5Q2Z1',
//   },
//   prod: {
//     apiKey: 'AIzaSyBiqjXBUlsNl3oyJ_Fi3JKd6bU7LWL_RUw',
//     authDomain: 'animeb-b876d.firebaseapp.com',
//     projectId: 'animeb-b876d',
//     storageBucket: 'animeb-b876d.appspot.com',
//     messagingSenderId: '718058068740',
//     appId: '1:718058068740:web:946882dd2efc9063cb4e51',
//     measurementId: 'G-YQHGW5Q2Z1',
//   },
// };
const firebaseConfig = {
  apiKey: 'AIzaSyBiqjXBUlsNl3oyJ_Fi3JKd6bU7LWL_RUw',
  authDomain: 'animeb-b876d.firebaseapp.com',
  projectId: 'animeb-b876d',
  storageBucket: 'animeb-b876d.appspot.com',
  messagingSenderId: '718058068740',
  appId: '1:718058068740:web:946882dd2efc9063cb4e51',
  measurementId: 'G-YQHGW5Q2Z1',
};

// Initialize Firebase
// const app = initializeApp(
//   process.env.NEXT_PUBLIC_PROD ? firebaseConfig.prod : firebaseConfig.dev
// );
if (!getApps()?.length) {
  initializeApp(firebaseConfig);
}

// export const auth = getAuth(app);
// export const db = getFirestore(app);
// export const functions = getFunctions(app, 'asia-northeast1');
// export const storage = getStorage(app);
export const auth = getAuth();
export const db = getFirestore();
// export const functions = getFunctions('asia-northeast1');
export const storage = getStorage();
