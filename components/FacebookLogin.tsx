import React, { useEffect } from 'react';
import {
  signInWithRedirect,
  getRedirectResult,
  FacebookAuthProvider,
} from 'firebase/auth';
import { auth, db } from '../utils/firebase';
import toast from 'react-hot-toast';

const provider = new FacebookAuthProvider();
// provider.addScope('user_birthday');

const FacebookLogin = () => {
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
        console.log(errorCode);
        const errorMessage = error.message;
        const email = error.email;
        const credential = FacebookAuthProvider.credentialFromError(error);
      });
  }, []);
  return (
    <button
      onClick={Login}
      className="flex w-full justify-center rounded-md border border-transparent bg-facebook py-2 px-4 text-sm font-medium text-white shadow-sm hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-facebook focus:ring-offset-2"
    >
      <svg
        className="h-5 w-5"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
          clipRule="evenodd"
        />
      </svg>
      <span className="ml-2">Facebookで登録・ログイン</span>
    </button>
  );
};

export default FacebookLogin;
