import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  increment,
  updateDoc,
} from '@firebase/firestore';
import { validateArgCount } from '@firebase/util';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationIcon } from '@heroicons/react/outline';
import { signOut, getAuth, deleteUser, User, getIdToken } from 'firebase/auth';
import { collectionGroup, getDocs, query, where } from 'firebase/firestore';
import { useRouter } from 'next/dist/client/router';
import React, {
  Fragment,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import BackGroundWhite from '../components/BackGroundWhite';
import Breadcrumbs from '../components/Breadcrumbs';
import Button from '../components/Button';
import SubpageTitle from '../components/SubpageTitle';
import LayoutNoNav from '../layouts/LayoutNoNav';
import { auth, db } from '../utils/firebase';
import { useAuth } from '../utils/userContext';
import * as admin from 'firebase-admin';

const Delete = () => {
  const { user } = useAuth();
  // console.log(user?.uid);

  //ログインしているかどうか
  const router = useRouter();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user === null && router.replace('/');
    });
  }, []);

  //user削除
  const auth = getAuth();
  const authUser = auth.currentUser;
  // console.log(authUser, 'authUser');
  // console.log(authUser?.uid, 'authUser.uid');

  const DeleteUserData = async () => {
    if (!authUser) {
      return;
    }
    const token = await getIdToken(authUser, true);
    fetch('/api/withdrawal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        authUser: authUser,
      }),
    })
      .then((res) => {
        toast.success('ユーザー情報を削除しました。');
        // console.log(res.status, '成功');
        // signOut(auth);
      })
      .catch((res) => {
        toast.error('ユーザー情報の削除に失敗しました。');
        // console.log(res.status, '失敗');
      });
  };
  const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);

  return (
    <>
      <Breadcrumbs />
      <BackGroundWhite>
        <SubpageTitle>退会</SubpageTitle>
        <p className="mb-8 text-center">
          アニメ部！を退会してもよろしいですか？
          <br />
          これまでの記録はすべて削除されてしまいます。
        </p>
        <p className="text-center">
          <button
            onClick={() => setOpen(true)}
            className="relative mx-auto inline-block rounded-full bg-buttonBlack py-3 px-12 text-white"
          >
            退会する
          </button>
        </p>
      </BackGroundWhite>
      <Breadcrumbs />
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                    <ExclamationIcon
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      最後の確認です。本当に削除しますか？
                    </Dialog.Title>
                    <div className="mt-2"></div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 sm:col-start-2 sm:text-sm"
                    onClick={DeleteUserData}
                  >
                    削除する
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none sm:col-start-1 sm:mt-0 sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    キャンセル
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default Delete;
Delete.getLayout = (page: ReactElement) => <LayoutNoNav>{page}</LayoutNoNav>;
