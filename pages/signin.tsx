import { KeyIcon, MailIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import React, { useEffect, ReactElement } from 'react';
import SubpageTitle from '../components/SubpageTitle';
import { auth, db } from '../utils/firebase';
import LayoutNoNav from '../layouts/LayoutNoNav';
import { useAuth } from '../utils/userContext';
import FacebookLogin from '../components/FacebookLogin';
import TwitterLogin from '../components/TwitterLogin';
import GoogleLogin from '../components/GoogleLogin';
import { useRouter } from 'next/dist/client/router';
import PasswordBaseSignin from '../components/PasswordBaseSignin';

const Signin = () => {
  //user管理
  const { user } = useAuth();
  //ログインしているかどうか
  const router = useRouter();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user && router.replace('/');
    });
  }, []);

  return (
    <>
      <div className="container flex flex-col justify-center pt-8 pb-8 md:pt-12">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <SubpageTitle>ログイン</SubpageTitle>
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="space-y-4">
              <GoogleLogin />
              <FacebookLogin />
              <TwitterLogin />
              <button className="flex w-full items-center justify-center rounded-md border border-transparent bg-line py-1 px-4 text-sm font-medium text-white shadow-sm hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-line focus:ring-offset-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 377.764 377.764"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    fill="#3ACE01"
                    d="M77.315 0h223.133c42.523 0 77.315 34.792 77.315 77.315v223.133c0 42.523-34.792 77.315-77.315 77.315H77.315C34.792 377.764 0 342.972 0 300.448V77.315C0 34.792 34.792 0 77.315 0z"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    fill="#FFF"
                    d="M188.515 62.576c76.543 0 138.593 49.687 138.593 110.979 0 21.409-7.576 41.398-20.691 58.351-.649.965-1.497 2.031-2.566 3.209l-.081.088c-4.48 5.36-9.525 10.392-15.072 15.037-38.326 35.425-101.41 77.601-109.736 71.094-7.238-5.656 11.921-33.321-10.183-37.925-1.542-.177-3.08-.367-4.605-.583l-.029-.002v-.002c-64.921-9.223-114.222-54.634-114.222-109.267-.002-61.292 62.049-110.979 138.592-110.979z"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    fill="#3ACE01"
                    d="M108.103 208.954h27.952c3.976 0 7.228-3.253 7.228-7.229v-.603c0-3.976-3.252-7.228-7.228-7.228h-20.121v-45.779c0-3.976-3.252-7.228-7.228-7.228h-.603c-3.976 0-7.228 3.252-7.228 7.228v53.609c0 3.977 3.252 7.23 7.228 7.23zm173.205-33.603v-.603c0-3.976-3.253-7.228-7.229-7.228h-20.12v-11.445h20.12c3.976 0 7.229-3.252 7.229-7.228v-.603c0-3.976-3.253-7.228-7.229-7.228h-27.952c-3.976 0-7.228 3.252-7.228 7.228v53.609c0 3.976 3.252 7.229 7.228 7.229h27.952c3.976 0 7.229-3.253 7.229-7.229v-.603c0-3.976-3.253-7.228-7.229-7.228h-20.12v-11.445h20.12c3.976.002 7.229-3.251 7.229-7.226zm-53.755 31.448l.002-.003a7.207 7.207 0 0 0 2.09-5.07v-53.609c0-3.976-3.252-7.228-7.229-7.228h-.603c-3.976 0-7.228 3.252-7.228 7.228v31.469l-26.126-35.042c-1.248-2.179-3.598-3.655-6.276-3.655h-.603c-3.976 0-7.229 3.252-7.229 7.228v53.609c0 3.976 3.252 7.229 7.229 7.229h.603c3.976 0 7.228-3.253 7.228-7.229v-32.058l26.314 35.941c.162.252.339.494.53.724l.001.002c.723.986 1.712 1.662 2.814 2.075.847.35 1.773.544 2.742.544h.603a7.162 7.162 0 0 0 3.377-.844c.723-.344 1.332-.788 1.761-1.311zm-71.208 2.155h.603c3.976 0 7.228-3.253 7.228-7.229v-53.609c0-3.976-3.252-7.228-7.228-7.228h-.603c-3.976 0-7.229 3.252-7.229 7.228v53.609c0 3.976 3.253 7.229 7.229 7.229z"
                  />
                </svg>
                <span className="ml-2">LINEで登録・ログイン</span>
              </button>
            </div>
            {/* <div className="mt-6 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">または</span>
              </div>
            </div>
            <PasswordBaseSignin /> */}
            <p className="lead mt-6 border-t border-gray-300 pt-4 text-xs text-gray-600">
              会員登録することにより、
              <Link href="/terms">
                <a className="underline">利用規約</a>
              </Link>
              および
              <Link href="/privacy">
                <a className="underline">プライバシーポリシー</a>
              </Link>
              に同意したとみなされます。
              <br />
              ユーザーの許可なくSNSに投稿することはありません。
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;

Signin.getLayout = (page: ReactElement) => <LayoutNoNav>{page}</LayoutNoNav>;
