import { KeyIcon, MailIcon, UserIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import React, { ReactElement, useEffect } from 'react';
import SubpageTitle from '../components/SubpageTitle';
import LayoutNoNav from '../layouts/LayoutNoNav';
import { auth } from '../utils/firebase';
import FacebookLogin from '../components/FacebookLogin';
import TwitterLogin from '../components/TwitterLogin';
import GoogleLogin from '../components/GoogleLogin';
import { useAuth } from '../utils/userContext';
import PasswordBaseSignup from '../components/PasswordBaseSignup';
import LineLogin from '../components/LineLogin';
import Breadcrumbs from '../components/Breadcrumbs';

const Signup = () => {
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
      <Breadcrumbs
        pages={[
          {
            name: '登録・ログイン',
          },
        ]}
      />
      <div className="container flex flex-col justify-center pt-8 pb-8 md:pt-12">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <SubpageTitle>登録・ログイン</SubpageTitle>
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="space-y-4">
              <GoogleLogin />
              <FacebookLogin />
              <TwitterLogin />
              <LineLogin />
            </div>
            {/* <div className="mt-6 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">または</span>
              </div>
            </div>
            <PasswordBaseSignup /> */}
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
      <Breadcrumbs
        pages={[
          {
            name: '登録・ログイン',
          },
        ]}
      />
    </>
  );
};

export default Signup;

Signup.getLayout = (page: ReactElement) => <LayoutNoNav>{page}</LayoutNoNav>;
