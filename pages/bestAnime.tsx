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
import { doc, updateDoc } from 'firebase/firestore';
import { UserRanking } from '../types/UserRanking';
import WatchedAnimes from '../components/WatchedAnimes';

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

  useEffect(() => {
    if (user?.ranking) {
      setRanking(user.ranking);
    } else {
      setRanking([]);
    }
  }, [user?.ranking]);

  console.log(user?.ranking);

  const [ranking, setRanking] = useState<UserRanking[]>([]);

  const bestAnimeSet = async () => {
    await updateDoc(doc(db, `users/${user?.uid}`), {
      ranking,
    }).then(() => alert('ベストアニメを登録しました'));
  };

  const choiced = {
    name: 'bestAnime',
    put: (to: any) => to.el.children.length < 3,
    // pull: (to: any, from: any) => from.el.children.length > 1,
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

        <WatchedAnimes></WatchedAnimes>
        <Button>さらに表示する</Button>
      </BackGroundWhite>

      <Breadcrumbs />
    </>
  );
};

export default BestAnime;
BestAnime.getLayout = (page: ReactElement) => <LayoutNoNav>{page}</LayoutNoNav>;
