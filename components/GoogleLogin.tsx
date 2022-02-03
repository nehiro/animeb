import React, { useEffect } from 'react';
import {
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth, db } from '../utils/firebase';

//Google signIn
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

const GoogleLogin = () => {
  const Login = () => {
    signInWithRedirect(auth, provider);
  };

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        const user = result?.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }, []);

  return (
    <button
      onClick={Login}
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-google hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-google"
    >
      <svg
        className="w-5 h-5"
        fill="currentColor"
        preserveAspectRatio="xMidYMid meet"
        height="18px"
        width="18px"
        viewBox="0 0 40 40"
      >
        <g>
          <path d="m20.1 17.5h16.2q0.3 1.5 0.3 2.9 0 4.8-2 8.7t-5.8 5.9-8.7 2.1q-3.5 0-6.6-1.3t-5.5-3.7-3.7-5.4-1.3-6.7 1.3-6.7 3.7-5.4 5.5-3.7 6.6-1.3q6.7 0 11.5 4.4l-4.6 4.5q-2.8-2.6-6.9-2.6-2.8 0-5.3 1.4t-3.9 4-1.4 5.4 1.4 5.4 3.9 4 5.3 1.4q2 0 3.6-0.5t2.7-1.3 1.8-1.9 1.2-1.9 0.5-1.8h-9.8v-5.9z"></path>
        </g>
      </svg>
      <span className="ml-2">Googleで登録・ログイン</span>
    </button>
  );
};

export default GoogleLogin;
