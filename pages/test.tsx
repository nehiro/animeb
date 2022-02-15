import React, { FC, ReactElement, useState } from 'react';
import { ReactSortable, Sortable } from 'react-sortablejs';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
} from 'firebase/firestore';
import { db } from '../utils/firebase';
import { User } from '../types/User';
import { useAuth } from '../utils/userContext';
import AnimesTest from '../components/WatchedAnimes';
import LayoutNoNav from '../layouts/LayoutNoNav';
import WatchedAnimes from '../components/WatchedAnimes';

interface ItemType {
  id: number;
  name: string;
}

const test = () => {
  // Add a new document with a generated id
  const newRef = doc(collection(db, `posts`));
  // console.log(newRef);
  const getNewRef = query(collection(db, 'posts'));
  // const agetNewRef = doc(db, 'posts');

  // later...
  const set = async () => {
    await setDoc(newRef, { data: 'test' });
  };

  const gets = async () => {
    const id = await getDocs(getNewRef);
    id.forEach((doc) => {
      // console.log(doc.id, ' => ', doc.data());
      // console.log(doc.id);
    });
  };

  // const get = async () => {
  //   const id = await getDoc(agetNewRef);
  // };

  const [select, setSelect] = useState<ItemType[]>([
    { id: 1, name: '11111111111111111' },
    { id: 2, name: '22222222222222222' },
  ]);
  const [watched, setWatched] = useState<ItemType[]>([
    { id: 3, name: '33333333333333333' },
    { id: 4, name: '44444444444444444' },
  ]);

  const removeDuplicateValues = ([...array]) => {
    return array.filter((value, index, self) => self.indexOf(value) === index);
  };

  const array01 = [
      { id: 1, animeImage: '/images/hiroaka.png', title: 'あ' },
      { id: 2, animeImage: '/images/hiroaka.png', title: 'い' },
      { id: 3, animeImage: '/images/hiroaka.png', title: 'う' },
    ],
    array02 = [
      { id: 1, animeImage: '/images/hiroaka.png', title: 'あ' },
      { id: 2, animeImage: '/images/hiroaka.png', title: 'い' },
      { id: 3, animeImage: '/images/hiroaka.png', title: 'う' },
      { id: 4, animeImage: '/images/hiroaka.png', title: 'え' },
    ];

  // console.log(
  //   removeDuplicateValues([...array01, ...array02]),
  //   'removeDuplicateValues'
  // );

  const teamA = { mary: 'manager', john: 'player', mike: 'manager' };
  const teamB = { mike: 'manager', will: 'player', john: 'player' };
  const bigTeam = { ...teamA, ...teamB };
  // console.log(bigTeam);

  return (
    <>
      {/* <button onClick={set} className="border border-pink-800">
        データ保存
      </button>
      <br />
      <button onClick={gets} className="border border-green-800">
        id取得
      </button>
      <br /> */}
      {/* <button onClick={get} className="border border-green-800">
        id取得
      </button> */}
      <WatchedAnimes></WatchedAnimes>
      {/* <p>SORT</p>
      <ReactSortable
        list={select}
        setList={setSelect}
        group="bestAnime"
        animation={200}
        delay={2}
        className="mb-4 grid grid-cols-2 gap-4"
      >
        {select.map((item) => (
          <div key={item.id} className="bg-red-400">
            {item.name}
          </div>
        ))}
      </ReactSortable>
      <ReactSortable
        list={watched}
        setList={setWatched}
        group="bestAnime"
        animation={200}
        delay={2}
        className="mb-4 grid grid-cols-2 gap-4"
      >
        {watched.map((item) => (
          <div key={item.id} className="bg-blue-400">
            {item.name}
          </div>
        ))}
      </ReactSortable> */}
    </>
  );
};

export default test;
test.getLayout = (page: ReactElement) => <LayoutNoNav>{page}</LayoutNoNav>;
