import { initializeApp, cert, getApps, App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
// console.log(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string));

if (!getApps()?.length) {
  initializeApp({
    credential: cert(
      // 環境変数から認証情報を取得
      JSON.parse(
        process.env.NEXT_PUBLIC_PROD === 'true'
          ? (process.env.GOOGLE_APPLICATION as string)
          : (process.env.GOOGLE_APPLICATION_DEV as string)
      )
    ),
  });
}
// const app: App = initializeApp();
// console.log(app.options.projectId);

export const auth = getAuth();
export const adminDB = getFirestore();
