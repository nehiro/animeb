import type { NextApiRequest, NextApiResponse } from 'next';
import { auth, adminDB } from '../../firebase/server';
import fetch from 'node-fetch';
import { Site } from '../../lib/site';
import {
  collection,
  collectionGroup,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../../utils/firebase';
import { deleteUser } from 'firebase/auth';
import toast from 'react-hot-toast';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const authUser = req.body.authUser;
  const uid = authUser.uid;
  // console.log(authUser, 'authUser');
  const token = req.headers.authorization?.split(' ')?.[1] as string;
  // console.log(token, 'token');
  // 認証トークンを検証
  try {
    await auth.verifyIdToken(token);
  } catch (error) {
    console.log(error);
    return res.status(500).send('error');
  }

  // console.log('走った');
  //フォローフォロワー

  //退会ユーザーがフォローしているユーザーのfollowerCountをマイナス
  const followerRef = collection(db, `users/${uid}/follows/`);
  if (followerRef) {
    const snap = await getDocs(followerRef);
    const snapData = snap.docs.map((doc) => doc.data());
    // console.log(snapData, 'snapData');
    snapData.forEach(
      async (item) =>
        await updateDoc(doc(db, `users/${item.id}`), {
          followerCount: increment(-1),
        })
    );
  } else {
    return null;
  }
  //退会ユーザーをフォローしているユーザーのfollowCountをマイナスとfollowsサブコレのuid削除
  const followRef = query(
    collectionGroup(db, 'follows'),
    where('id', '==', `${uid}`)
  );
  if (followRef) {
    const snap = await getDocs(followRef);
    const snapData = snap.docs.map((item) => {
      return getLists(item.ref.parent.parent?.id as string);
    });
    const snapSubData = snap.docs.map(async (item) => {
      const followUserUid = item.ref.parent.parent?.id as string;
      const ref = doc(db, `users/${followUserUid}/follows/${uid}`);
      await deleteDoc(ref);
    });

    const lists = await Promise.all(snapData);
    // console.log(lists, 'lists');

    lists.forEach(
      async (item: any) =>
        await updateDoc(doc(db, `users/${item.uid}`), {
          followCount: increment(-1),
        })
    );
  } else {
    return null;
  }

  //auth情報
  await deleteUser(authUser)
    .then(() => {})
    .catch(() => {});

  //ユーザー情報
  // await deleteDoc(doc(db, `users/${user?.uid}/follows`)).then(() => {});
  await deleteDoc(doc(db, `users/${uid}`)).then(() => {});

  //stripe履歴
  await deleteDoc(doc(db, `customers/${uid}`)).then(() => {});

  //reviews
  //reviewsのuid削除
  //それぞれのスコアをマイナス、reviewCount、unScoreCountをマイナス

  //lists
  //listsのuidを削除
  //listCountをマイナス

  // すべてが成功
  res.status(200).json('success');
};

const getLists = async (id: string): Promise<any> => {
  const userRef = doc(db, `users/${id}`);
  const userSnap = await getDoc(userRef);
  const userData = userSnap.data();
  // console.log(userData, 'userData');
  return userData as any;
};

export default handler;
