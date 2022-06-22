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
  // console.log(authUser, 'authUser');
  const uid = authUser.uid;
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

  // //フォローフォロワー

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
            console.log('フォロワー数マイナス成功', new Date(), item.uid);
          })
          .catch(() => {
            console.log('フォロワー数マイナス失敗', new Date(), item.uid);
          })
    );
  } else {
    return null;
  }
  //退会ユーザーをフォローしているユーザーのfollowCountをマイナスとfollowsサブコレのuid削除
  // const followRef = query(
  //   collectionGroup(db, 'follows'),
  //   where('uid', '==', `${uid}`)
  // );
  // if (followRef) {
  //   const snap = await getDocs(followRef);
  //   const snapData = snap.docs.map((item) => {
  //     return getLists(item.ref.parent.parent?.id as string);
  //   });
  //   const snapSubData = snap.docs.map(async (item) => {
  //     const followUserUid = item.ref.parent.parent?.id as string;
  //     const ref = doc(db, `users/${followUserUid}/follows/${uid}`);
  //     await deleteDoc(ref)
  //       .then(() => {
  //         console.log('uid削除成功');
  //       })
  //       .catch(() => {
  //         console.log('uid削除失敗');
  //       });
  //   });

  //   const lists = await Promise.all(snapData);
  //   // console.log(lists, 'lists');

  //   lists.forEach(
  //     async (item: any) =>
  //       await updateDoc(doc(db, `users/${item.uid}`), {
  //         followCount: increment(-1),
  //       })
  //         .then(() => {
  //           console.log('フォローカウントマイナス成功');
  //         })
  //         .catch(() => {
  //           console.log('フォローカウントマイナス失敗');
  //         })
  //   );
  // } else {
  //   return null;
  // }

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
            .then(async () => {
              //auth情報
              await getAuth()
                .deleteUser(uid)
                .then(() => {
                  console.log(new Date(), 'アカウント削除成功');
                })
                .catch(() => {
                  console.log('アカウント削除失敗');
                });
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
  // collectiongroupでとってくる
  //それぞれのスコアをマイナス、reviewCount、unScoreCountをマイナス
  // const reviewRef = query(
  //   collectionGroup(db, 'reviews'),
  //   where('uid', '==', `${uid}`)
  // );
  // if (reviewRef) {
  //   const snap = await getDocs(reviewRef);
  //   // console.log(snap.docs, 'snapdocs');
  //   const snapData = snap.docs.map(async (item) => {
  //     const parentId = item.ref.parent.parent?.id;
  //     const parentRef = doc(db, `animes/${parentId}/reviews/${uid}`);
  //     const userData = item.data();
  //     // console.log(userData.isScore);
  //     if (userData.isScore === false) {
  //       await deleteDoc(parentRef)
  //         .then(() => {
  //           getAnimesLists(parentId as string).then(async (item) => {
  //             await updateDoc(doc(db, `animes/${item.id}`), {
  //               unScoreReviewCount: increment(-1),
  //               sumReviewCount: increment(-1),
  //             })
  //               .then(() => {
  //                 console.log(
  //                   '削除uidのisScore === falseのデータ削除成功。且つunScoreReviewCount-1成功'
  //                 );
  //               })
  //               .catch(() => {
  //                 console.log('unScoreReviewCount-1失敗');
  //               });
  //           });
  //         })
  //         .catch(() => {
  //           console.log('削除uidのisScore === falseのデータ削除失敗');
  //         });
  //     } else {
  //       //isScoreがtrueの場合それぞれのスコアをアニメのスコアからひく
  //       // さらにreviewCountを1マイナス
  //       // console.log(userData.musicScore, 'musicScore');
  //       // console.log(userData.storyScore, 'storyScore');
  //       // console.log(userData.drawingScore, 'drawingScore');
  //       // console.log(userData.characterScore, 'characterScore');
  //       // console.log(userData.voiceActorScore, 'voiceActorScore');
  //       getAnimesLists(parentId as string).then(async (item) => {
  //         await updateDoc(doc(db, `animes/${item.id}`), {
  //           musicScore: increment(-userData.musicScore),
  //           storyScore: increment(-userData.storyScore),
  //           drawingScore: increment(-userData.drawingScore),
  //           characterScore: increment(-userData.characterScore),
  //           voiceActorScore: increment(-userData.voiceActorScore),
  //           reviewCount: increment(-1),
  //           sumReviewCount: increment(-1),
  //         }).then(async () => {
  //           await deleteDoc(parentRef)
  //             .then(() => {
  //               console.log(
  //                 '削除uidのisScore === trueのデータ削除成功。且つそれぞれのスコアマイナスとreviewCountを-1成功'
  //               );
  //             })
  //             .catch(() => {
  //               console.log('reviewCount-1失敗');
  //             });
  //         });
  //       });
  //     }
  //   });
  //   const lists = await Promise.all(snapData);
  //   // console.log(lists, 'lists');

  //   // サブコレクションのuidを削除
  // }

  // //lists
  // //listsのuidを削除
  // //listCountをマイナス
  // const listRef = query(
  //   collectionGroup(db, 'lists'),
  //   where('uid', '==', `${uid}`)
  // );
  // if (listRef) {
  //   const snap = await getDocs(listRef);
  //   const snapData = snap.docs.map(async (item) => {
  //     const parentId = item.ref.parent.parent?.id;
  //     console.log(parentId, 'parentId');
  //     const parentRef = doc(db, `animes/${parentId}/lists/${uid}`);
  //     // サブコレクションのuidを削除
  //     await deleteDoc(parentRef)
  //       .then(() => {
  //         console.log('削除uidのデータ削除成功');
  //       })
  //       .catch(() => {
  //         console.log('削除uidのデータ削除失敗');
  //       });
  //     // getListsはuser data
  //     return getAnimesLists(parentId as string);
  //   });
  //   const lists = await Promise.all(snapData);
  //   // console.log(lists, 'lists');

  //   // さらにlistCountを1マイナス
  //   lists.forEach(
  //     async (list: any) =>
  //       await updateDoc(doc(db, `animes/${list.id}`), {
  //         listCount: increment(-1),
  //       })
  //         .then(() => {
  //           console.log('listCountマイナス成功');
  //         })
  //         .catch(() => {
  //           console.log('listCountマイナス失敗');
  //         })
  //   );
  // }

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

const getAnimesLists = async (id: string): Promise<any> => {
  const animeRef = doc(db, `animes/${id}`);
  const userSnap = await getDoc(animeRef);
  const userData = userSnap.data();
  // console.log(userData, 'userData');
  return userData as any;
};

export default handler;
