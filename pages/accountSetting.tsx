import { doc, setDoc, updateDoc } from '@firebase/firestore';
import { useRouter } from 'next/dist/client/router';
import React, { ReactElement, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import BackGroundWhite from '../components/BackGroundWhite';
import Breadcrumbs from '../components/Breadcrumbs';
import SubpageTitle from '../components/SubpageTitle';
import LayoutNoNav from '../layouts/LayoutNoNav';
import { auth, db } from '../utils/firebase';
import { useAuth } from '../utils/userContext';

interface IFormInput {
  email: string;
  gender: number;
  bd: string;
}

const AccountSetting = () => {
  const { user } = useAuth();
  //ログインしているかどうか
  const router = useRouter();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user === null && router.replace('/');
    });
  }, []);

  /***useForm START***/
  //formの型

  //user登録
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>({
    mode: 'onChange',
  });
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await updateDoc(doc(db, `users/${user?.uid}`), {
      email: data.email,
      gender: data.gender,
      bd: data.bd,
    }).then(() => {
      alert(`${data.email}\n${data.gender}\n${data.bd}\nを登録しました。`);
    });
  };
  /***useForm END***/

  if (user === undefined) {
    return null;
  }

  return (
    <>
      <Breadcrumbs />
      <BackGroundWhite>
        <SubpageTitle>アカウント設定</SubpageTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ul className="mb-8">
            <li className="mb-4">
              <label htmlFor="email" className="block font-bold">
                メールアドレスを変更する
                <span className="inline-block bg-red-600 text-white px-2 ml-2 mb-2">
                  必須
                </span>
              </label>
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
                className="border rounded w-full box-border h-10 p-2"
                required
                defaultValue={user?.email}
              />
              {errors.email?.type === 'required' && (
                <p className="mt-2 text-red-600">
                  メールアドレスを入力してください。
                </p>
              )}
              {errors.email?.type === 'pattern' && (
                <p className="mt-2 text-red-600">{errors.email.message}</p>
              )}
            </li>
            <li className=" mb-4">
              <label htmlFor="gender" className="block mb-2 font-bold">
                性別を変更する
              </label>
              <input
                type="radio"
                {...register('gender')}
                name="gender"
                value="male"
                className="mr-2"
                defaultChecked={user?.gender === 'male'}
              />
              男性
              <input
                type="radio"
                {...register('gender')}
                name="gender"
                value="female"
                className="mr-2 ml-4"
                defaultChecked={user?.gender === 'female'}
              />
              女性
              <input
                type="radio"
                {...register('gender')}
                name="gender"
                value="noAnswer"
                className="mr-2 ml-4"
                defaultChecked={user?.gender === 'noAnswer'}
              />
              無回答
            </li>
            <li className="mb-4">
              <label htmlFor="bd" className="block mb-2 font-bold">
                生年月日を変更する
              </label>
              <input
                id="bd"
                {...register('bd')}
                type="date"
                className="border rounded w-full box-border h-10 p-2"
                defaultValue={user?.bd}
              />
            </li>
            <li className="text-center">
              <input
                type="submit"
                value="保存する"
                className="bg-buttonBlack rounded-full py-3 px-12 text-white mx-auto inline-block relative"
              />
            </li>
          </ul>
        </form>
      </BackGroundWhite>
      <Breadcrumbs />
    </>
  );
};

export default AccountSetting;
AccountSetting.getLayout = (page: ReactElement) => (
  <LayoutNoNav>{page}</LayoutNoNav>
);
