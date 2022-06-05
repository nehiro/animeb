import type { NextApiRequest, NextApiResponse } from 'next';
import * as admin from 'firebase-admin';
import { db } from '../../utils/firebase';
import { getAuth } from 'firebase-admin/auth';
import { auth, adminDB } from '../../firebase/server';
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

  //auth情報
  await getAuth()
    .deleteUser(uid)
    .then(() => {
      console.log('アカウント削除成功');
    })
    .catch(() => {
      console.log('アカウント削除失敗');
    });
  //フォローフォロワー

  //退会ユーザーがフォローしているユーザーのfollowerCountをマイナス
  const followerRef = collection(db, `users/${uid}/follows/`);
  if (followerRef) {
    const snap = await getDocs(followerRef);
    const snapData = snap.docs.map((doc) => doc.data());
    // console.log(snapData, 'snapData');
    snapData.forEach(
      async (item) =>
        await updateDoc(doc(db, `users/${item.uid}`), {
          followerCount: increment(-1),
        })
          .then(() => {
            console.log('フォロワー数マイナス成功', item.uid);
          })
          .catch(() => {
            console.log('フォロワー数マイナス失敗', item.uid);
          })
    );
  } else {
    return null;
  }
  //退会ユーザーをフォローしているユーザーのfollowCountをマイナスとfollowsサブコレのuid削除
  const followRef = query(
    collectionGroup(db, 'follows'),
    where('uid', '==', `${uid}`)
  );
  if (followRef) {
    const snap = await getDocs(followRef);
    const snapData = snap.docs.map((item) => {
      return getLists(item.ref.parent.parent?.id as string);
    });
    const snapSubData = snap.docs.map(async (item) => {
      const followUserUid = item.ref.parent.parent?.id as string;
      const ref = doc(db, `users/${followUserUid}/follows/${uid}`);
      await deleteDoc(ref)
        .then(() => {
          console.log('uid削除成功');
        })
        .catch(() => {
          console.log('uid削除失敗');
        });
    });

    const lists = await Promise.all(snapData);
    // console.log(lists, 'lists');

    lists.forEach(
      async (item: any) =>
        await updateDoc(doc(db, `users/${item.uid}`), {
          followCount: increment(-1),
        })
          .then(() => {
            console.log('フォローカウントマイナス成功');
          })
          .catch(() => {
            console.log('フォローカウントマイナス失敗');
          })
    );
  } else {
    return null;
  }

  //ユーザー情報
  //サブコレ削除

  const deleteDocumentRecursively = async (
    docRef: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>
  ) => {
    const collections = await docRef.listCollections();
    // console.log(docRef.id, 'docRef.id');

    if (collections.length > 0) {
      for (const collection of collections) {
        const snapshot = await collection.get();
        // console.log(snapshot, 'snapshot');
        for (const docc of snapshot.docs) {
          const ref = doc(db, `users/${uid}/follows/${docc.id}`);
          deleteDoc(ref)
            .then(() => {
              console.log('サブコレ削除成功', docc.id);
            })
            .catch(() => {
              console.log('サブコレ削除失敗', docc.id);
            });
          // console.log(doc, 'doc');
          // console.log(doc.ref, 'doc.ref');
          // console.log(docc.data(), 'doc.data()');
          await deleteDocumentRecursively(docc.ref);
        }
      }
    } else {
      //退会ユーザーにdeletedを入れる
      const ref = admin.firestore().collection('users').doc(uid);
      // await ref
      //   .set({
      //     deleted: true,
      //   })
      //   .then(() => {
      //     console.log('deleted代入成功', ref.id);
      //   })
      //   .catch(() => {
      //     console.log('deleted代入失敗', ref.id);
      //   });
      await ref
        .delete()
        .then(() => {
          console.log('ユーザー情報削除成功', docRef.id);
        })
        .catch(() => {
          console.log('ユーザー情報削除失敗', docRef.id);
        });
    }
  };

  (async () => {
    const db = admin.firestore();
    // サブコレクション含め再帰的に削除する＝中身が空になるまで
    await deleteDocumentRecursively(db.collection('users').doc(uid));
  })().catch((e) => {
    console.log(e);
  });

  // stripe履歴
  await deleteDoc(doc(db, `customers/${uid}`))
    .then(() => {
      console.log('ストライプ削除成功');
    })
    .catch(() => {
      console.log('ストライプ削除失敗');
    });

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
