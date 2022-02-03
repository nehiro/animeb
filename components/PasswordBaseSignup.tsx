import React from 'react';
import { KeyIcon, MailIcon, UserIcon } from '@heroicons/react/solid';
import Link from 'next/Link';
import { createUserWithEmailAndPassword, User } from 'firebase/auth';
import { auth, db } from '../utils/firebase';
import { useForm, SubmitHandler } from 'react-hook-form';
import { doc, setDoc } from '@firebase/firestore';
import { useRouter } from 'next/dist/client/router';

type Inputs = {
  name: string;
  email: string;
  password: string;
};

type AuthContextProps = {
  user: User | null | undefined;
};

const PasswordBaseSignup = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data, 'submit');

  const createUser = async (data, e) => {
    const email = data.email;
    const password = data.password;
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        try {
          const docRef = await setDoc(doc(db, 'users', auth.currentUser.uid), {
            uid: auth.currentUser.uid,
            name: data.name,
            email: email,
            photoURL: '/images/default-img.jpg',
          });
        } catch (e) {
          console.error('Error adding document: ', e);
        }

        // Signed in
        const user = userCredential.user;
        // ...
        router.push('/signin');
      })
      .catch((err) => {
        alert(err.message);
        // ..
      });
  };

  return (
    <form className="mt-6 space-y-4" onSubmit={handleSubmit(createUser)}>
      <div>
        {/* <label
          htmlFor="email"
          className="sr-only text-sm font-medium text-gray-700"
        >
          ユーザー名
        </label> */}
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <UserIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            id="name"
            className="block w-full pl-10 sm:text-sm border rounded-md py-2"
            placeholder="ユーザー名"
            required
            autoComplete="name"
            {...register('name', { required: true, maxLength: 20 })}
          />
          {errors.name?.type === 'required' && (
            <p className="mt-2 text-red-600">ユーザー名を入力してください。</p>
          )}
          {errors.name?.type === 'maxLength' && (
            <p className="mt-2 text-red-600">20文字以内で入力してください。</p>
          )}
        </div>
      </div>
      <div>
        <label
          htmlFor="email"
          className="sr-only text-sm font-medium text-gray-700"
        >
          メールアドレス
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
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
            className="block w-full pl-10 sm:text-sm border rounded-md py-2"
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
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <KeyIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="password"
            id="password"
            autoComplete="current-password"
            required
            placeholder="パスワード"
            className="appearance-none block w-full pl-10 py-2 sm:text-sm border rounded-md"
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
          className="w-full flex justify-center py-2 px-4 border bg-buttonBlack text-white hover:bg-gray-500"
        >
          メールアドレスで新規登録
        </button>
        <div className="text-xs mt-4 text-center">
          <Link href="/signin">
            <a>メールアドレスで登録している方はこちら</a>
          </Link>
        </div>
      </div>
    </form>
  );
};

export default PasswordBaseSignup;
