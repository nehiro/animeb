import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { getStorage } from 'firebase/storage';
import { getAnalytics, logEvent } from 'firebase/analytics';

const firebaseConfig = {
  dev: {
    apiKey: 'AIzaSyBiqjXBUlsNl3oyJ_Fi3JKd6bU7LWL_RUw',
    authDomain: 'animeb-b876d.firebaseapp.com',
    databaseURL:
      'https://animeb-b876d-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'animeb-b876d',
    storageBucket: 'animeb-b876d.appspot.com',
    messagingSenderId: '718058068740',
    appId: '1:718058068740:web:946882dd2efc9063cb4e51',
    measurementId: 'G-YQHGW5Q2Z1',
  },
  prod: {
    apiKey: 'AIzaSyD0DCmjxr1p_S0R8nXJMbzzAGCcay6VHr4',
    authDomain: 'anime-club-prod.firebaseapp.com',
    projectId: 'anime-club-prod',
    storageBucket: 'anime-club-prod.appspot.com',
    messagingSenderId: '722037007139',
    appId: '1:722037007139:web:d931744258cdfd42e3a296',
    measurementId: 'G-4VQK0VS9DX',
  },
};
// const firebaseConfig = {
//   apiKey: "AIzaSyBiqjXBUlsNl3oyJ_Fi3JKd6bU7LWL_RUw",
//   authDomain: "animeb-b876d.firebaseapp.com",
//   databaseURL: "https://animeb-b876d-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "animeb-b876d",
//   storageBucket: "animeb-b876d.appspot.com",
//   messagingSenderId: "718058068740",
//   appId: "1:718058068740:web:946882dd2efc9063cb4e51",
//   measurementId: "G-YQHGW5Q2Z1"
// };

// Initialize Firebase
// const app = initializeApp(
//   process.env.NEXT_PUBLIC_PROD ? firebaseConfig.prod : firebaseConfig.dev
// );
if (!getApps()?.length) {
  initializeApp(
    process.env.NEXT_PUBLIC_PROD === 'true'
      ? firebaseConfig.prod
      : firebaseConfig.dev
  );
}
// console.log(process.env.NEXT_PUBLIC_PROD, 'process.env.NEXT_PUBLIC_PROD');
// if (!getApps()?.length) {
//   initializeApp(firebaseConfig.dev);
// }

// export const auth = getAuth(app);
// export const db = getFirestore(app);
// export const functions = getFunctions(app, 'asia-northeast1');
// export const storage = getStorage(app);
export const auth = getAuth();
export const db = getFirestore();
// export const functions = getFunctions('asia-northeast1');
export const storage = getStorage();
// export const analytics = getAnalytics();
// logEvent(analytics, 'notification_received');
