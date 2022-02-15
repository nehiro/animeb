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
  const { user } = useAuth();
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
    const ref = collection(db, `users/${user?.uid}/watchedAnimes`);
    // console.log(ref, 'ref');
    return onSnapshot(ref, async (snap) => {
      // console.log(snap, 'snap');
      const tasks = snap.docs.map((doc) => {
        // console.log(doc.id, 'doc.id');
        return getWatchedAnimes(doc.id);
      });
      const animes = await Promise.all(tasks);

      // console.log(animes, 'animes');

      if (ranking) {
        // console.log('上が走った');
        // console.log(ranking, 'ranking');
        // console.log(
        //   ranking.map((item) => item.id),
        //   'ranking.id'
        // );
        // console.log(animes, 'animes');
        const newAnimes = animes.filter(
          (anime) => !ranking.map((anime) => anime.id).includes(anime.id)
        );
        // console.log(newAnimes, 'newAnimes');
        setWatchedAnimes(newAnimes);
      } else {
        // console.log('下が走った');
        setWatchedAnimes(animes);
      }
    });
  };

  const getWatchedAnimes = async (id: string): Promise<WatchedAnime> => {
    const ref = doc(db, `users/${user?.uid}/watchedAnimes/${id}`);
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
        className="mb-4 grid grid-cols-5 gap-4"
        list={watchedAnimes}
        setList={setWatchedAnimes}
        group="bestAnime"
        animation={200}
        delay={2}
        tag="ul"
      >
        {watchedAnimes ? (
          watchedAnimes?.map((item) => (
            <li key={item.id}>
              <div className="relative h-24 w-20">
                <Image src={item.image} alt="" layout="fill" />
              </div>
              {item.title}
            </li>
          ))
        ) : (
          <li>作品がありません。</li>
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
