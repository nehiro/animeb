import React from 'react';
import { KeyIcon, MailIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../utils/firebase';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/dist/client/router';

type Inputs = {
  email: string;
  password: string;
};

const PasswordBaseSignin = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const logIn = async (data, e) => {
    const email = data.email;
    const password = data.password;
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        router.push('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  return (
    <form className="mt-6 space-y-4" onSubmit={handleSubmit(logIn)}>
      <div>
        <label
          htmlFor="email"
          className="sr-only text-sm font-medium text-gray-700"
        >
          メールアドレス
        </label>
        <div className="relative mt-1 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MailIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            {...register('email', {
              required: true,
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'メールアドレスの形式を確認してください。',
              },
            })}
            id="email"
            autoComplete="email"
            placeholder="メールアドレス"
            className="block w-full rounded-md border py-2 pl-10 sm:text-sm"
            required
          />
          {errors.email?.type === 'required' && (
            <p className="mt-2 text-red-600">
              メールアドレスを入力してください。
            </p>
          )}
          {errors.email?.type === 'pattern' && (
            <p className="mt-2 text-red-600">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="password"
          className="sr-only text-sm font-medium text-gray-700"
        >
          パスワード
        </label>
        <div className="relative mt-1 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <KeyIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="password"
            id="password"
            autoComplete="current-password"
            required
            placeholder="パスワード"
            className="block w-full appearance-none rounded-md border py-2 pl-10 sm:text-sm"
            {...register('password', { required: true })}
          />
          {errors.email?.type === 'required' && (
            <p className="mt-2 text-red-600">パスワードを入力してください。</p>
          )}
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center border bg-buttonBlack py-2 px-4 text-white hover:bg-gray-500"
        >
          メールアドレスでログイン
        </button>
        <div className="mt-4 text-center text-xs">
          <Link href="/signup">
            <a>まだ登録していない方はこちら</a>
          </Link>
        </div>
      </div>
    </form>
  );
};

export default PasswordBaseSignin;
