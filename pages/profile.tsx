import React, { ReactElement, useEffect, useState, Fragment } from 'react';
import { PhotographIcon } from '@heroicons/react/solid';
import BackGroundWhite from '../components/BackGroundWhite';
import Breadcrumbs from '../components/Breadcrumbs';
import Button from '../components/Button';
import SubpageTitle from '../components/SubpageTitle';
import Layout from '../layouts/Layout';
import { useAuth } from '../utils/userContext';
import { useForm, SubmitHandler, useFormState } from 'react-hook-form';
import { doc, getDoc, setDoc, updateDoc } from '@firebase/firestore';
import { auth, db, storage } from '../utils/firebase';
import { useRouter } from 'next/dist/client/router';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import Modal from 'react-modal';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import LayoutNoNav from '../layouts/LayoutNoNav';
import toast from 'react-hot-toast';

//formの型
interface IFormInput {
  name: string;
  intro: string;
  photoURL: string;
}

const Profile = () => {
  //user管理
  const { user } = useAuth();
  //ログインしているかどうか
  const router = useRouter();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user === null && router.replace('/');
    });
  }, []);

  /***useForm START***/
  //user登録
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<IFormInput>({
    mode: 'onChange',
  });
  // const { dirtyFields } = useFormState({
  //   control,
  // });
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(preview, 'preview');
    const photoURL = preview ? await uploadAvatar() : user?.photoURL || null;
    await updateDoc(doc(db, `users/${user?.uid}`), {
      name: data.name,
      intro: data.intro,
      photoURL,
    })
      .then(() => {
        toast.success('プロフィール登録に成功しました。');
      })
      .catch(() => {
        toast.error('プロフィール登録に失敗しました。');
      });
  };
  /***useForm END***/

  // dbから画像とってくる
  // useEffect(() => {
  //   const userDoc = doc(db, `users/${user?.uid}`);

  //   getDoc(userDoc).then((result) => {
  //     const userData = result.data();
  //     const photo = userData?.photoURL;
  //     if (photo) {
  //       setPreview(photo);
  //     }
  //   });
  // }, []);

  // プレビュー画像を管理
  const [preview, setPreview] = useState<string>();
  // console.log(preview, 'preview');

  // クロッパーを管理
  const [cropper, setCropper] = useState<Cropper | null>();

  // クロップ対象のファイルを管理
  const [targetFile, setTargetFile] = useState<Blob | null>();

  // クロップ対象の画像をセット
  const setImageToCropper = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTargetFile(event?.target.files?.[0] as Blob);
    event.target.value = '';
  };

  // クロッパーの初期化（モーダル起動後に発動）
  const initCropper = () => {
    // イメージタグを捕捉
    const image: HTMLImageElement = document.getElementById(
      'image'
    ) as HTMLImageElement;

    // 選択された画像ファイルを文字列に変換するために必要なリーダー
    const reader = new FileReader();

    // 画像ファイル読み込み時に発動する処理
    reader.onload = (event) => {
      // 文字列として読み込んだ画像をイメージタグにセット
      image.src = event?.target?.result as string;

      // クロッパーの初期化
      const wrapper = new Cropper(image, {
        aspectRatio: 1 / 1,
        cropBoxResizable: false,
        cropBoxMovable: true,
        dragMode: 'move',
        viewMode: 3,
        responsive: true,
      });

      // クロッパーをステートに保持させる
      setCropper(wrapper);
    };

    // リーダーに画像ファイルを渡す
    reader.readAsDataURL(targetFile as Blob);
  };

  // プレビューされている内容をアップロード
  const uploadAvatar = async () => {
    // 保存先のRefを取得
    // アップロードするときココから不変 START
    const storageRef = ref(storage, `users/${user?.uid}/avatar.jpg`);
    // console.log(preview, 'preview');

    // 画像アップロード
    await uploadString(storageRef, preview as string, 'data_url');

    // アップロードした画像を表示するためのURLを取得
    const photoURL = await getDownloadURL(storageRef);

    return photoURL;

    // アップロードするときココから不変 END
  };

  if (user === undefined) {
    return null;
  }

  return (
    <>
      <Breadcrumbs />
      <BackGroundWhite>
        <SubpageTitle>プロフィール編集</SubpageTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ul>
            <li className="mb-4">
              <label className="relative mb-4 inline-block cursor-pointer">
                {preview ? (
                  <img
                    className="block h-20 w-20 overflow-hidden rounded-full border"
                    src={preview}
                    alt=""
                  />
                ) : (
                  <div className="h-20 w-20 overflow-hidden rounded-full border bg-gray-400">
                    <img
                      src={user?.photoURL}
                      alt=""
                      className="h-full w-full"
                    />
                  </div>
                )}

                <input
                  className="hidden"
                  type="file"
                  onChange={setImageToCropper}
                />
                <PhotographIcon className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 transform text-white opacity-70" />
              </label>
            </li>
            <li className="mb-4">
              <label className="mb-2 block" htmlFor="name">
                ユーザーネーム
              </label>
              <input
                type="text"
                {...register('name', { required: true, maxLength: 20 })}
                autoComplete="name"
                id="name"
                className="box-border h-10 w-full rounded border p-2"
                required
                defaultValue={user?.name}
              />
              {errors.name?.type === 'required' && (
                <p className="mt-2 text-red-600">
                  ユーザー名を入力してください。
                </p>
              )}
              {errors.name?.type === 'maxLength' && (
                <p className="mt-2 text-red-600">
                  20文字以内で入力してください。
                </p>
              )}
            </li>
            <li className="mb-8">
              <label className="mb-2 block" htmlFor="intro">
                自己紹介
              </label>
              <textarea
                className="box-border h-36 w-full rounded border p-2"
                id="intro"
                {...register('intro')}
                defaultValue={user?.intro}
              ></textarea>
            </li>
            <li className="mb-4 text-center">
              <button className="relative mx-auto inline-block cursor-pointer rounded-full bg-buttonBlack py-3 px-12 font-normal text-white transition duration-200 ease-in-out hover:bg-yellow hover:font-bold hover:text-buttonBlack">
                保存する
              </button>
            </li>
          </ul>
        </form>
      </BackGroundWhite>
      <Breadcrumbs />
      <Modal
        isOpen={!!targetFile}
        onAfterOpen={initCropper}
        onRequestClose={() => setTargetFile(null)}
        contentLabel="Example Modal"
      >
        <h2 className="mb-6 text-2xl font-bold">クロップ</h2>

        <div className="mb-4 max-w-sm border-b pb-4">
          <img id="image" className="block w-full" alt="" />
        </div>

        <button
          className="rounded bg-gray-700 px-4 py-3 text-white shadow"
          onClick={() => {
            // プレビューステートにクロッピング結果を格納
            const croppedImage = cropper
              ?.getCroppedCanvas({
                width: 300, // リサイズ
                height: 300, // リサイズ
              })
              .toDataURL('image/jpeg');

            // プレビューステートにセット
            setPreview(croppedImage);

            // ダイヤログを閉じるためにクロップターゲットを空にする
            setTargetFile(null);
          }}
        >
          クロップする
        </button>
      </Modal>
    </>
  );
};

export default Profile;
Profile.getLayout = (page: ReactElement) => <LayoutNoNav>{page}</LayoutNoNav>;
