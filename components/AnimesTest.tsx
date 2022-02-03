import React, { useEffect } from 'react';
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { useState } from 'react';
import { Anime } from '../types/Anime';
import { useAuth } from '../utils/userContext';

const AnimesTest = () => {
  const { user } = useAuth();

  const [watchedAnimes, setWatchedAnimes] = useState<Anime[]>();
  // console.log(watchedAnimes, 'watchedAnimes');

  useEffect(() => {
    WatchedAnimes();
  }, []);

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
      console.log(animes, 'animes');

      setWatchedAnimes(animes);
    });
  };

  const getWatchedAnimes = async (id: string): Promise<Anime> => {
    const ref = doc(db, `users/${user?.uid}/watchedAnimes/${id}`);
    const snap = await getDoc(ref);
    // console.log(snap, 'snap');
    return snap.data() as Anime;
  };

  console.log(watchedAnimes, 'watchedAnimes');

  return (
    <>
      <p>観たアニメ</p>
      <ul>
        {watchedAnimes?.map((watchedAnime) => {
          <li key={watchedAnime.id}>
            {watchedAnime.id}
            {watchedAnime.title}
          </li>;
        })}
      </ul>
    </>
  );
};

export default AnimesTest;
