import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import { Configure, Hits, InstantSearch, Stats } from 'react-instantsearch-dom';
import { searchClient } from '../pages/api/client';
import { useAuth } from '../utils/userContext';
import { auth, db } from '../utils/firebase';
import { savePostToAlgolia } from '../lib/post';
import { Post } from '../types/post';
import PostItem from './PostItem';
import { getIdToken } from 'firebase/auth';

const Timeline = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user, followUsers } = useAuth();
  if (!user || !followUsers) {
    return null;
  }

  const onSubmit = async ({ body }: { body: string }) => {
    if (!user) {
      alert('ログインしてください');
      return;
    }
    if (!body) {
      alert('空です');
      return;
    }

    // firestoreでドキュメントidを先に生成
    const ref = doc(collection(db, 'posts'));
    const id = ref.id;

    const newPost: Post = {
      id,
      authorId: user.uid,
      createdAt: Date.now(),
      likeCount: 0,
      body,
    };
    // Firestoreにデータを追加
    await setDoc(doc(db, `posts/${id}`), newPost);
    // Algoliaにデータを追加
    if (!auth.currentUser) {
      return;
    }
    const token = await getIdToken(auth.currentUser, true);
    // const token = await getIdToken(auth.currentUser!, true);
    console.log(token, 'token');
    await savePostToAlgolia(newPost, token);

    reset();
    alert('投稿成功');
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea
            className="mb-1 block w-full resize-none rounded border border-gray-300"
            {...register('body')}
          />
          <div className="text-right">
            <button className="rounded bg-sky-500 px-3 py-1.5 text-sm text-white">
              投稿
            </button>
          </div>
        </form>
        <InstantSearch searchClient={searchClient} indexName="posts">
          <Configure
            facetFilters={[
              [...followUsers, user].map((user) => `authorId:${user.uid}`),
            ]}
          />
          <Hits hitComponent={PostItem} />
          <Stats
            translations={{
              stats(nbHits) {
                return !nbHits ? '投稿がありません' : '';
              },
            }}
          />
        </InstantSearch>
      </div>
    </>
  );
};

export default Timeline;
