import { initializeApp, cert, getApps, App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
// console.log(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string));
const getGoogleAppricationCredentials = () => {
  if (process.env.NEXT_PUBLIC_PROD === 'true') {
    return process.env.GOOGLE_APPLICATION_CREDENTIALS_PROD as string;
  } else {
    return process.env.GOOGLE_APPLICATION_CREDENTIALS_DEV as string;
  }
};

if (!getApps()?.length) {
  initializeApp({
    credential: cert(
      // 環境変数から認証情報を取得
      JSON.parse(getGoogleAppricationCredentials())
    ),
  });
}
// const app: App = initializeApp();
// console.log(app.options.projectId);

export const auth = getAuth();
export const adminDB = getFirestore();
