import type { NextApiRequest, NextApiResponse } from 'next';
import * as admin from 'firebase-admin';
import { db } from '../../utils/firebase';
import { getAuth } from 'firebase-admin/auth';
import { auth, adminDB, adminStorage } from '../../firebase/server';
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
import { FieldValue } from 'firebase-admin/firestore';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const authUser = req.body.authUser;
  // console.log(authUser, 'authUser');
  const uid = authUser.uid;
  const token = req.headers.authorization?.split(' ')?.[1] as string;
  // console.log(token, 'token');
  // 認証トークンを検証
  try {
    await auth.verifyIdToken(token);
  } catch (error) {
    // console.log(error, 'ここのエラー');
    return res.status(500).send('error');
  }

  //フォローフォロワー

  //退会ユーザーがフォローしているユーザーのfollowerCountをマイナス
  // const followerRef = collection(db, `users/${uid}/follows/`);
  const followerRef = adminDB.collection(`users/${uid}/follows/`);
  if (followerRef) {
    // const snap = await getDocs(followerRef);
    const snap = await followerRef.get();
    const snapData = snap.docs.map((doc) => doc.data());
    // console.log(snapData, 'snapData');
    snapData.forEach(async (item) => {
      // console.log(item, 'item');
      const ref = await adminDB.collection('users').doc(`${item.uid}`);
      // console.log((await ref.get()).data(), 'ref.get().data()');
      // const prevFollowerCount = (await ref.get()).data()?.followerCount;
      ref
        .update({
          // followerCount: (await (await ref.get()).data()?.followerCount) - 1,
          followerCount: FieldValue.increment(-1),
        })
        .then((s) => {
          console.log('フォロワー数マイナス成功', new Date(), item.uid);
        })
        .catch((e) => {
          console.log('フォロワー数マイナス失敗', e);
        });
    });
  } else {
    return null;
  }
  //退会ユーザーをフォローしているユーザーのfollowCountをマイナスとfollowsサブコレのuid削除
  const followRef = adminDB
    .collectionGroup('follows')
    .where('uid', '==', `${uid}`);
  if (followRef) {
    const snap = await followRef.get();
    const snapData = snap.docs.map((item) => {
      return getLists(item.ref.parent.parent?.id as string);
    });
    snap.docs.map(async (item) => {
      const followUserUid = item.ref.parent.parent?.id as string;
      console.log(followUserUid, 'followUserUid');
      const ref = adminDB.collection(`users/${followUserUid}/follows`).doc(uid);
      // console.log((await ref.get()).data(), 'ref');
      await ref
        .delete()
        .then(() => {
          console.log('uid削除成功');
        })
        .catch(() => {
          console.log('uid削除失敗');
        });
    });

    const lists = await Promise.all(snapData);
    // console.log(lists, 'lists');

    lists.forEach(async (item: any) => {
      const ref = adminDB.collection('users').doc(item.uid);
      await ref
        .update({
          followCount: FieldValue.increment(-1),
        })
        .then(() => {
          console.log('フォローカウントマイナス成功');
        })
        .catch(() => {
          console.log('フォローカウントマイナス失敗');
        });
    });
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
        for (const userDoc of snapshot.docs) {
          const ref = adminDB
            .collection(`users/${uid}/follows`)
            .doc(userDoc.id)
            .delete()
            .then(() => {
              console.log('サブコレ削除成功', userDoc.id);
            })
            .catch(() => {
              console.log('サブコレ削除失敗', userDoc.id);
            });
          // console.log(doc, 'doc');
          // console.log(doc.ref, 'doc.ref');
          // console.log(docc.data(), 'doc.data()');
          await deleteDocumentRecursively(userDoc.ref);
        }
      }
    } else {
      //サブコレがなくなったら退会ユーザーにdeletedを入れる
      const ref = admin.firestore().collection('users').doc(uid);
      await ref
        .set({
          deleted: true,
        })
        .then(() => {
          console.log('deleted代入成功', ref.id);
        })
        .catch(() => {
          console.log('deleted代入失敗', ref.id);
        });
      // await ref
      //   .delete()
      //   .then(() => {
      //     console.log('ユーザー情報削除成功', docRef.id);
      //   })
      //   .catch(() => {
      //     console.log('ユーザー情報削除失敗', docRef.id);
      //   });
    }
  };

  (async () => {
    const db = admin.firestore();
    // サブコレクション含め再帰的に削除する＝中身が空になるまで
    await deleteDocumentRecursively(adminDB.collection('users').doc(uid));
  })().catch((e) => {
    console.log(e);
  });

  // // stripe履歴
  const stripeRef = adminDB.collection(`customers`).doc(uid);
  if (stripeRef) {
    await stripeRef
      .delete()
      .then(() => {
        console.log('ストライプ削除成功');
      })
      .catch(() => {
        console.log('ストライプ削除失敗');
      });
  }

  //reviews
  //reviewsのuid削除
  // collectiongroupでとってくる
  //それぞれのスコアをマイナス、reviewCount、unScoreCountをマイナス
  console.log('走った');
  const reviewRef = adminDB.collectionGroup('reviews').where('uid', '==', uid);
  if (reviewRef) {
    const snap = await reviewRef.get();
    // console.log(snap.docs, 'snapdocs');
    const snapData = snap.docs.map(async (item) => {
      const parentId = item.ref.parent.parent?.id;
      const parentRef = adminDB
        .collection(`animes/${parentId}/reviews`)
        .doc(uid);
      const userData = item.data();
      console.log(userData, userData.isScore, 'userData');
      if (userData.isScore === false) {
        await parentRef
          .delete()
          .then(() => {
            getAnimesLists(parentId as string).then(async (item) => {
              const updateRef = adminDB.collection('animes').doc(item.id);
              await updateRef
                .update({
                  unScoreReviewCount: FieldValue.increment(-1),
                  sumReviewCount: FieldValue.increment(-1),
                })
                .then(() => {
                  console.log(
                    '削除uidのisScore === falseのデータ削除成功。且つunScoreReviewCount-1成功'
                  );
                })
                .catch(() => {
                  console.log('unScoreReviewCount-1失敗');
                });
            });
          })
          .catch(() => {
            console.log('削除uidのisScore === falseのデータ削除失敗');
          });
      } else {
        //isScoreがtrueの場合それぞれのスコアをアニメのスコアからひく
        // さらにreviewCountを1マイナス
        // console.log(userData.musicScore, 'musicScore');
        // console.log(userData.storyScore, 'storyScore');
        // console.log(userData.drawingScore, 'drawingScore');
        // console.log(userData.characterScore, 'characterScore');
        // console.log(userData.voiceActorScore, 'voiceActorScore');
        getAnimesLists(parentId as string).then(async (item) => {
          const updateRef = adminDB.collection('animes').doc(item.id);
          await updateRef
            .update({
              musicScore: FieldValue.increment(-userData.musicScore),
              storyScore: FieldValue.increment(-userData.storyScore),
              drawingScore: FieldValue.increment(-userData.drawingScore),
              characterScore: FieldValue.increment(-userData.characterScore),
              voiceActorScore: FieldValue.increment(-userData.voiceActorScore),
              reviewCount: FieldValue.increment(-1),
              sumReviewCount: FieldValue.increment(-1),
            })
            .then(async () => {
              await parentRef
                .delete()
                .then(() => {
                  console.log(
                    '削除uidのisScore === trueのデータ削除成功。且つそれぞれのスコアマイナスとreviewCountを-1成功'
                  );
                })
                .catch(() => {
                  console.log('reviewCount-1失敗');
                });
            });
        });
      }
    });
    // console.log(lists, 'lists');

    // サブコレクションのuidを削除
  }

  //lists
  //listsのuidを削除
  //listCountをマイナス
  // console.log('走った');
  const listRef = adminDB.collectionGroup('lists').where('uid', '==', uid);

  if (listRef) {
    const snap = await listRef.get();
    const snapData = snap.docs.map(async (item) => {
      const parentId = item.ref.parent.parent?.id;
      // console.log(parentId, 'parentId');
      const parentRef = adminDB.collection(`animes/${parentId}/lists`).doc(uid);

      // サブコレクションのuidを削除
      // console.log(await (await parentRef.get()).data(), 'data');
      await parentRef
        .delete()
        .then(() => {
          console.log('削除uidのデータ削除成功');
        })
        .catch(() => {
          console.log('削除uidのデータ削除失敗');
        });
      // // getListsはuser data
      return getAnimesLists(parentId as string);
    });
    const lists = await Promise.all(snapData);
    // console.log(lists, 'lists');

    // さらにlistCountを1マイナス
    lists.forEach(async (list: any) => {
      const ref = adminDB.collection('animes').doc(list.id);
      await ref
        .update({
          listCount: FieldValue.increment(-1),
        })
        .then(() => {
          console.log('listCountマイナス成功');
        })
        .catch(() => {
          console.log('listCountマイナス失敗');
        });
    });
  }

  // Storageのプロフィール画像削除
  const userPath = `users/${uid}/avatar.jpg`;
  const userStorage = adminStorage.file(userPath);
  if (userStorage) {
    userStorage.delete();
    console.log('ユーザーの画像削除成功');
  } else {
    console.log('削除する画像がありませんでした');
  }

  await getAuth()
    .deleteUser(uid)
    .then(() => {
      console.log(new Date(), 'アカウント削除成功');
    })
    .catch(() => {
      console.log('アカウント削除失敗');
    });

  // すべてが成功
  res.status(200).json('success');
};

const getLists = async (id: string): Promise<any> => {
  const userRef = adminDB.collection('users').doc(id);
  const doc = await userRef.get();
  if (!doc.exists) {
    console.log('No such document!');
  } else {
    const userData = doc.data();
    return userData as any;
  }
};

const getAnimesLists = async (id: string): Promise<any> => {
  const animeRef = adminDB.collection('animes').doc(id);
  const userSnap = await animeRef.get();
  if (!userSnap.exists) {
    console.log('No such document!');
  } else {
    const userData = userSnap.data();
    return userData as any;
  }
};

export default handler;
