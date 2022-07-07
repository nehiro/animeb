import { initializeApp, cert, getApps, App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
// console.log(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string));
if (!getApps()?.length) {
  initializeApp({
    credential: cert(
      // 環境変数から認証情報を取得
      JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS as string)
    ),
    storageBucket:
      process.env.NEXT_PUBLIC_PROD === 'true'
        ? 'anime-club-prod.appspot.com'
        : 'animeb-b876d.appspot.com',
  });
}
// const app: App = initializeApp();
// console.log(app.options.projectId);

export const auth = getAuth();
export const adminDB = getFirestore();
export const adminStorage = getStorage().bucket();
