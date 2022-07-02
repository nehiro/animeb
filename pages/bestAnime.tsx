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
import toast from 'react-hot-toast';

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
    if (user?.ranking.length) {
      // console.log('rankingあり');
      setRankingData(user.ranking);
    } else {
      // console.log('空');
      setRankingData([]);
    }
  }, [user?.ranking]);

  // console.log(user?.ranking);

  const [rankingData, setRankingData] = useState<UserRanking[]>([]);
  // console.log(rankingData, 'rankingData');
  const ranking = rankingData.map((item) => {
    return {
      title: item.title,
      id: item.id,
    };
  });
  // console.log(ranking, 'ranking');

  const bestAnimeSet = async () => {
    await updateDoc(doc(db, `users/${user?.uid}`), {
      ranking,
    }).then(() => toast.success('ベストアニメを登録しました'));
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
      <Breadcrumbs
        pages={[
          {
            name: 'ベストアニメ設定',
          },
        ]}
      />
      <BackGroundWhite>
        <SubpageTitle>ベストアニメ設定</SubpageTitle>
        <p className="mb-4 text-center">ドラッグ&ドロップで並び替え</p>
        <ReactSortable
          className="mb-4 grid h-60 min-w-200 grid-cols-3 gap-4 border-2 border-dotted bg-amber-50 p-4"
          list={rankingData}
          setList={setRankingData}
          group={choiced}
          animation={200}
          delay={2}
          tag="ul"
        >
          {rankingData.length === 0 ? (
            <li className="col-span-3 flex items-center justify-center">
              作品が選ばれていません。
            </li>
          ) : (
            rankingData.map((item) => (
              <li
                key={item.id}
                className="flex justify-center bg-16 bg-left bg-no-repeat first:bg-no1 last:bg-no3 even:bg-no2"
              >
                <div className="relative h-full w-1/2">
                  <Image
                    src={
                      'https://raw.githubusercontent.com/nehiro/animeb-public/main/images/' +
                      `${item.title}` +
                      '.jpg'
                    }
                    layout="fill"
                    className="object-contain"
                    alt=""
                  />
                </div>
                {/* <p>{item.title}</p> */}
              </li>
            ))
          )}
        </ReactSortable>
        {/* {user?.ranking.length === 0 ? (
          <ReactSortable
            className="mb-4 grid h-40 min-w-200 grid-cols-3 gap-4 border-2"
            list={ranking}
            setList={setRanking}
            group={noChoiced}
            animation={200}
            delay={2}
            tag="ul"
          >
            <li className="col-span-3 flex items-center justify-center">
              作品が選ばれていません。
            </li>
          </ReactSortable>
        ) : (
          <ReactSortable
            className="mb-4 grid h-40 min-w-200 grid-cols-3 gap-4 border-2"
            list={ranking}
            setList={setRanking}
            group={choiced}
            animation={200}
            delay={2}
            tag="ul"
          >
            {ranking.map((item) => (
              <li key={item.id}>
                <div className="relative h-24 w-20">
                  <Image
                    src={
                      'https://raw.githubusercontent.com/nehiro/animeb-public/main/images/' +
                      `${item.title}` +
                      '.jpg'
                    }
                    layout="fill"
                    className="object-cover"
                    alt=""
                  />
                </div>
                {item.title}
              </li>
            ))}
          </ReactSortable>
        )} */}
        <div className="mb-8 text-center">
          <button
            className="relative mx-auto inline-block rounded-full bg-buttonBlack py-3 px-12 text-white"
            onClick={bestAnimeSet}
          >
            保存する
          </button>
        </div>
        {/* <BackGroundGray>
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
        </BackGroundGray> */}

        <WatchedAnimes></WatchedAnimes>
        {/* <Button>さらに表示する</Button> */}
      </BackGroundWhite>

      <Breadcrumbs
        pages={[
          {
            name: 'ベストアニメ設定',
          },
        ]}
      />
    </>
  );
};

export default BestAnime;
BestAnime.getLayout = (page: ReactElement) => <LayoutNoNav>{page}</LayoutNoNav>;
