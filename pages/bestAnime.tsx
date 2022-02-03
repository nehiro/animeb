import { SearchIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import React, { ReactElement, useEffect, useState } from 'react';
import BackGroundGray from '../components/BackGroundGray';
import BackGroundWhite from '../components/BackGroundWhite';
import Breadcrumbs from '../components/Breadcrumbs';
import Button from '../components/Button';
import SubpageTitle from '../components/SubpageTitle';
import LayoutNoNav from '../layouts/LayoutNoNav';
import { auth, db } from '../utils/firebase';
import { useAuth } from '../utils/userContext';
import { ItemInterface, ReactSortable, Sortable } from 'react-sortablejs';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

type ItemType = {
  id: number;
  image: string;
  title: string;
  chosen?: boolean;
  selected?: boolean;
};

const BestAnime = () => {
  // user管理
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    //ログインしていなかったらリダイレクト
    auth.onAuthStateChanged((user) => {
      user === null && router.replace('/');
    });
  }, []);

  //ランキング
  const setUserRanking = () => {
    if (user?.ranking) {
      return user?.ranking;
    } else {
      return [];
    }
  };
  console.log(setUserRanking(), 'setUserRanking');

  const [ranking, setRanking] = useState(setUserRanking() as ItemInterface[]);

  // userが見た作品
  // const watchedDoc = () => {
  //   const ref = collection(db, `watchedAnimes`);
  //   return onSnapshot(ref, async (snap) => {
  //     const tasks = snap.docs.map((doc) => {
  //       return getUser(doc.id);
  //     });
  //     const users = await Promise.all(tasks);
  //   });
  // };

  //rankingとwatchedAnimesで共通の内容を排除
  // if (watchedAnimes === undefined) {
  //   return [];
  // }

  // const newAnimes = watchedAnimes.map((watchedAnime) => {
  //   const sameIdItem = ranking.find((item) => item.id === watchedAnime.id);
  //   if (sameIdItem) {
  //     return setWatched(watchedAnimes);
  //   } else {
  //     return setWatched(watchedAnimes);
  //   }
  // });

  const [watched, setWatched] = useState<ItemType[]>([]);
  // const [watched, setWatched] = useState<ItemType[]>([
  //   { id: 1, image: '/images/hiroaka.png', title: 'あ' },
  //   { id: 2, image: '/images/hiroaka.png', title: 'い' },
  //   { id: 3, image: '/images/hiroaka.png', title: 'う' },
  //   { id: 4, image: '/images/hiroaka.png', title: 'え' },
  // ]);

  const bestAnimeSet = async () => {
    await updateDoc(doc(db, `users/${user?.uid}`), {
      ranking,
    }).then(() => alert('ベストアニメを登録しました'));
  };

  const choiced = {
    name: 'bestAnime',
    put: (to: any) => to.el.children.length < 3,
  };

  if (user === undefined) {
    return null;
  }

  return (
    <>
      <Breadcrumbs />
      <BackGroundWhite>
        <SubpageTitle>ベストアニメ設定</SubpageTitle>
        <p className="mb-4 text-center">ドラッグ&ドロップで並び替え</p>
        <ReactSortable
          className="mb-4 grid h-40 min-w-200 grid-cols-3 gap-4 border-2"
          list={ranking}
          setList={setRanking}
          group={choiced}
          animation={200}
          delay={2}
          tag="ul"
        >
          {ranking.length === 0 ? (
            <li className="col-span-3 flex items-center justify-center">
              作品が選ばれていません。
            </li>
          ) : (
            ranking.map((item) => (
              <li key={item.id}>
                <div className="relative h-24 w-20">
                  <Image src={item.image} alt="" layout="fill"></Image>
                </div>
                {item.title}
              </li>
            ))
          )}
        </ReactSortable>
        <div className="text-center">
          <button
            className="relative mx-auto inline-block rounded-full bg-buttonBlack py-3 px-12 text-white"
            onClick={bestAnimeSet}
          >
            保存する
          </button>
        </div>
        <BackGroundGray>
          <form
            action=""
            className="relative mx-auto mb-12 hidden h-10 max-w-xl flex-1 items-center rounded-full bg-white md:flex"
          >
            <input
              type="text"
              placeholder="観た作品の中からキーワードで検索"
              className="h-full w-full rounded-full px-6 outline-none"
            />
            <button>
              <SearchIcon className="absolute top-0 bottom-0 right-3 m-auto inline-block h-5 w-5 text-gray-500" />
            </button>
          </form>
        </BackGroundGray>

        <ReactSortable
          className="mb-4 grid grid-cols-5 gap-4"
          list={watched}
          setList={setWatched}
          group="bestAnime"
          animation={200}
          delay={2}
          tag="ul"
        >
          {watched ? (
            watched?.map((item) => (
              <li key={item.id}>
                <div className="relative h-24 w-20">
                  <Image src={item.image} alt="" layout="fill"></Image>
                </div>
                {item.title}
              </li>
            ))
          ) : (
            <li>作品がありません。</li>
          )}
        </ReactSortable>
        <Button>さらに表示する</Button>
      </BackGroundWhite>

      <Breadcrumbs />
    </>
  );
};

export default BestAnime;
BestAnime.getLayout = (page: ReactElement) => <LayoutNoNav>{page}</LayoutNoNav>;
