import React, { useEffect } from 'react';
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../utils/firebase';
import { useState } from 'react';
import { Anime } from '../types/Anime';
import { useAuth } from '../utils/userContext';
import { useRouter } from 'next/router';
import { ReactSortable } from 'react-sortablejs';
import { UserRanking } from '../types/UserRanking';
import { WatchedAnime } from '../types/WatchedAnime';
import Image from 'next/image';

const WatchedAnimes = () => {
  const { user, reviews } = useAuth();
  const router = useRouter();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user === null && router.replace('/');
    });
  }, []);

  // ranking

  useEffect(() => {
    if (user?.ranking) {
      setRanking(user.ranking);
    } else {
      setRanking([]);
    }
  }, [user?.ranking]);

  // console.log(user?.ranking, 'user?.ranking');

  const [ranking, setRanking] = useState<UserRanking[]>([]);

  //観たアニメ
  useEffect(() => {
    if (ranking) {
      WatchedAnimes();
    }
  }, [ranking]);

  const [watchedAnimes, setWatchedAnimes] = useState<WatchedAnime[]>([]);

  const WatchedAnimes = () => {
    const ref = collection(db, `users/${user?.uid}/reviews`);

    if (ranking) {
      // console.log('上が走った');
      // console.log(ranking, 'ranking');
      // console.log(
      //   ranking.map((item) => item.id),
      //   'ranking.id'
      // );
      // console.log(animes, 'animes');
      const newAnimes = reviews?.filter(
        (anime) => !ranking.map((anime) => anime.id).includes(anime.id)
      );
      // console.log(newAnimes, 'newAnimes');
      setWatchedAnimes(newAnimes as WatchedAnime[]);
    } else {
      // console.log('下が走った');
      setWatchedAnimes(reviews as WatchedAnime[]);
    }
    // console.log(ref, 'ref');
    // return onSnapshot(ref, async (snap) => {
    //   // console.log(snap, 'snap');
    //   const tasks = snap.docs.map((doc) => {
    //     // console.log(doc.id, 'doc.id');
    //     return getWatchedAnimes(doc.id);
    //   });
    //   const animes = await Promise.all(tasks);

    //   // console.log(animes, 'animes');

    //   if (ranking) {
    //     // console.log('上が走った');
    //     // console.log(ranking, 'ranking');
    //     // console.log(
    //     //   ranking.map((item) => item.id),
    //     //   'ranking.id'
    //     // );
    //     // console.log(animes, 'animes');
    //     const newAnimes = animes.filter(
    //       (anime) => !ranking.map((anime) => anime.id).includes(anime.id)
    //     );
    //     // console.log(newAnimes, 'newAnimes');
    //     setWatchedAnimes(newAnimes);
    //   } else {
    //     // console.log('下が走った');
    //     setWatchedAnimes(animes);
    //   }
    // });
  };

  const getWatchedAnimes = async (id: string): Promise<WatchedAnime> => {
    const ref = doc(db, `users/${user?.uid}/reviews/${id}`);
    const snap = await getDoc(ref);
    // console.log(snap, 'snap');
    return snap.data() as WatchedAnime;
  };

  console.log(watchedAnimes, 'watchedAnimes');

  if (user === undefined) {
    return null;
  }

  return (
    <>
      <ReactSortable
        className="mb-4 grid min-h-100 grid-cols-3 justify-items-center gap-4 border-2 border-dotted bg-amber-50 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
        list={watchedAnimes}
        setList={setWatchedAnimes}
        group="bestAnime"
        animation={200}
        delay={2}
        tag="ul"
      >
        {watchedAnimes.length ? (
          watchedAnimes?.map((item) => (
            <li key={item.id} className="w-full text-center">
              <div className="relative mb-2 h-52 w-full">
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
              {item.title}
            </li>
          ))
        ) : (
          <li className="col-span-6 flex items-center justify-center">
            レビュー済みの作品がありません。
          </li>
        )}
      </ReactSortable>
      {/* <ul>
        {watchedAnimes?.map((WatchedAnime) => (
          <li key={WatchedAnime.id}>{WatchedAnime.id}</li>
        ))}
      </ul> */}
    </>
  );
};

export default WatchedAnimes;
